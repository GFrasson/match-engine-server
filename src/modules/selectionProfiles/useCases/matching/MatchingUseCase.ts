import { inject, injectable } from "tsyringe";

import { Bull } from "@modules/bulls/infra/typeorm/entities/Bull";
import { IBullFeaturesRepository } from "@modules/bulls/repositories/IBullFeaturesRepository";
import { IBullsRepository } from "@modules/bulls/repositories/IBullsRepository";
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
        @inject("BullsRepository")
        private bullsRepository: IBullsRepository,
        @inject("BullFeaturesRepository")
        private bullFeaturesRepository: IBullFeaturesRepository
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

        const matchingBulls = await this.bullFeaturesRepository.matching(selectionProfile.forms);

        return matchingBulls;
    }
}

export { MatchingUseCase, IMatchingRequest };
