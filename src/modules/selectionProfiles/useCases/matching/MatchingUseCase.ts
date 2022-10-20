import { inject, injectable } from "tsyringe";

import { Bull } from "@modules/bulls/infra/typeorm/entities/Bull";
import { BullFeature } from "@modules/bulls/infra/typeorm/entities/BullFeature";
import { IBullFeaturesRepository } from "@modules/bulls/repositories/IBullFeaturesRepository";
import { Operator } from "@modules/selectionProfiles/infra/typeorm/enums/Operator";
import { BullFeatureMatchMap } from "@modules/selectionProfiles/mappers/BullFeatureMatchMap";
import { IProfileItemsRepository } from "@modules/selectionProfiles/repositories/IProfileItemsRepository";
import { ISelectionProfilesRepository } from "@modules/selectionProfiles/repositories/ISelectionProfilesRepository";
import { AppError } from "@shared/errors/AppError";

interface IMatchingRequest {
    selection_profile_id: string;
    cow_first_level_parent: string;
    cow_second_level_parent: string;
    cow_third_level_parent: string;
}

interface IResponse {
    register_id: string;
    name: string;
    gender: string;
    first_level_parent: string;
    second_level_parent: string;
    third_level_parent: string;
    bull_features: {
        [attribute: string]: number;
    };
}

@injectable()
class MatchingUseCase {
    constructor(
        @inject("SelectionProfilesRepository")
        private selectionProfilesRepository: ISelectionProfilesRepository,
        @inject("BullFeaturesRepository")
        private bullFeaturesRepository: IBullFeaturesRepository,
        @inject("ProfileItemsRepository")
        private profileItemsRepository: IProfileItemsRepository
    ) {}

    async execute({
        selection_profile_id,
        cow_first_level_parent,
        cow_second_level_parent,
        cow_third_level_parent,
    }: IMatchingRequest): Promise<IResponse[]> {
        const selectionProfile = await this.selectionProfilesRepository.findById(
            selection_profile_id
        );

        if (!selectionProfile) {
            throw new AppError("Perfil de seleção não encontrado", 404);
        }

        const consanguinityProfileItem = await this.profileItemsRepository.findByAttribute(
            "consanguinity"
        );

        const consanguinityForm = selectionProfile.forms.find(
            (form) => form.profile_item_id === consanguinityProfileItem.id
        );

        const matchingBulls = await this.bullFeaturesRepository.matching(
            selectionProfile.forms.filter(
                (form) => form.profile_item_id !== consanguinityProfileItem.id
            )
        );

        const operatorsMap = {
            [Operator.LESS_THAN]: (a: number, b: number) => a < b,
            [Operator.LESS_THAN_EQUAL]: (a: number, b: number) => a <= b,
            [Operator.EQUAL]: (a: number, b: number) => a === b,
            [Operator.GREATER_THAN]: (a: number, b: number) => a > b,
            [Operator.GREATER_THAN_EQUAL]: (a: number, b: number) => a >= b,
        };

        const consanguinityOperatorFunction = operatorsMap[consanguinityForm.operator];

        const cowParentsNames = [
            cow_first_level_parent.toLowerCase(),
            cow_second_level_parent.toLowerCase(),
            cow_third_level_parent.toLowerCase(),
        ];

        const matchingBullsCheckConsanguinity = matchingBulls.filter((bull) => {
            const bullParentsNames = [
                bull.first_level_parent?.toLowerCase(),
                bull.second_level_parent?.toLowerCase(),
                bull.third_level_parent?.toLowerCase(),
            ];

            let genealogyCount = 2;
            let hasCommonAncestors = false;

            cowParentsNames.every((cowParentsName) => {
                const parentNameMatchIndex = bullParentsNames.findIndex(
                    (parentName) => parentName === cowParentsName
                );

                if (parentNameMatchIndex !== -1) {
                    genealogyCount += parentNameMatchIndex;
                    hasCommonAncestors = true;

                    return false;
                }

                genealogyCount++;

                return true;
            });

            const consanguinity = hasCommonAncestors ? 0.5 ** genealogyCount * 100 : 0;

            return consanguinityOperatorFunction(consanguinity, consanguinityForm.value);
        });

        let index = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const bull of matchingBullsCheckConsanguinity) {
            // eslint-disable-next-line no-await-in-loop
            const bullFeatures = await this.bullFeaturesRepository.findByBullId(bull.id);
            matchingBullsCheckConsanguinity[index].bull_features = bullFeatures;
            index++;
        }

        return BullFeatureMatchMap.toDTO(
            matchingBullsCheckConsanguinity as Bull[] & { bull_features: { [key: string]: number } }
        );
    }
}

export { MatchingUseCase, IMatchingRequest, IResponse };
