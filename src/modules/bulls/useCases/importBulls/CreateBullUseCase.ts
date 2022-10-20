import { inject, injectable } from "tsyringe";

import { Bull } from "@modules/bulls/infra/typeorm/entities/Bull";
import { IBullFeaturesRepository } from "@modules/bulls/repositories/IBullFeaturesRepository";
import { IBullsRepository } from "@modules/bulls/repositories/IBullsRepository";
import { IProfileItemsRepository } from "@modules/selectionProfiles/repositories/IProfileItemsRepository";

interface ICreateBullRequest {
    register_id: string;
    name: string;
    gender: string;
    first_level_parent_id?: string;
    second_level_parent_id?: string;
    third_level_parent_id?: string;
    profile_items: {
        [attribute: string]: number;
    };
}

@injectable()
class CreateBullUseCase {
    constructor(
        @inject("BullsRepository")
        private bullsRepository: IBullsRepository,
        @inject("BullFeaturesRepository")
        private bullFeaturesRepository: IBullFeaturesRepository,
        @inject("ProfileItemsRepository")
        private profileItemsRepository: IProfileItemsRepository
    ) {}

    async execute({
        register_id,
        name,
        gender,
        first_level_parent_id,
        second_level_parent_id,
        third_level_parent_id,
        profile_items,
    }: ICreateBullRequest): Promise<Bull> {
        const bull = await this.bullsRepository.create({
            register_id,
            name,
            gender,
            first_level_parent_id,
            second_level_parent_id,
            third_level_parent_id,
        });

        Object.entries(profile_items).map(async ([attributeName, attributeValue]) => {
            const profileItem = await this.profileItemsRepository.findByAttribute(attributeName);

            if (profileItem) {
                await this.bullFeaturesRepository.create({
                    bull_id: bull.id,
                    profile_item_id: profileItem.id,
                    value: attributeValue,
                });
            }
        });

        return bull;
    }
}

export { CreateBullUseCase, ICreateBullRequest };
