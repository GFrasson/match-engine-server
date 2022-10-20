import { inject, injectable } from "tsyringe";

import { Bull } from "@modules/bulls/infra/typeorm/entities/Bull";
import { IBullFeaturesRepository } from "@modules/bulls/repositories/IBullFeaturesRepository";
import { Operator } from "@modules/selectionProfiles/infra/typeorm/enums/Operator";
import { IProfileItemsRepository } from "@modules/selectionProfiles/repositories/IProfileItemsRepository";
import { ISelectionProfilesRepository } from "@modules/selectionProfiles/repositories/ISelectionProfilesRepository";
import { AppError } from "@shared/errors/AppError";

interface IMatchingRequest {
    selection_profile_id: string;
    cow_first_level_parent: string;
    cow_second_level_parent: string;
    cow_third_level_parent: string;
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
    }: IMatchingRequest): Promise<Bull[]> {
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

        console.log(matchingBulls);

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

        console.log(cowParentsNames);

        const matchingBullsCheckConsanguinity = matchingBulls.filter((bull) => {
            const bullParentsNames = [
                bull.first_level_parent?.name.toLowerCase(),
                bull.second_level_parent?.name.toLowerCase(),
                bull.third_level_parent?.name.toLowerCase(),
            ];

            console.log(bullParentsNames);

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

            const consanguinity = hasCommonAncestors ? 0.5 ** genealogyCount : 0;

            console.log(genealogyCount, hasCommonAncestors);

            return consanguinityOperatorFunction(consanguinity, consanguinityForm.value);
        });

        return matchingBullsCheckConsanguinity;
    }
}

export { MatchingUseCase, IMatchingRequest };
