import {
    Repository,
    LessThan,
    LessThanOrEqual,
    Not,
    Equal,
    MoreThan,
    MoreThanOrEqual,
} from "typeorm";

import { ICreateBullFeatureDTO } from "@modules/bulls/dtos/ICreateBullFeatureDTO";
import { IBullFeaturesRepository } from "@modules/bulls/repositories/IBullFeaturesRepository";
import { Form } from "@modules/selectionProfiles/infra/typeorm/entities/Form";
import { Operator } from "@modules/selectionProfiles/infra/typeorm/enums/Operator";
import AppDataSource from "@shared/infra/typeorm";

import { Bull } from "../entities/Bull";
import { BullFeature } from "../entities/BullFeature";

class BullFeaturesRepository implements IBullFeaturesRepository {
    private repository: Repository<BullFeature>;

    constructor() {
        this.repository = AppDataSource.getRepository(BullFeature);
    }

    async create({ bull_id, profile_item_id, value }: ICreateBullFeatureDTO): Promise<BullFeature> {
        const bullFeature = this.repository.create({
            bull_id,
            profile_item_id,
            value,
        });

        await this.repository.save(bullFeature);

        return bullFeature;
    }

    async matching(forms: Form[]): Promise<Bull[]> {
        const operatorsMap = {
            [Operator.LESS_THAN]: LessThan,
            [Operator.LESS_THAN_EQUAL]: LessThanOrEqual,
            [Operator.EQUAL]: Equal,
            [Operator.GREATER_THAN]: MoreThan,
            [Operator.GREATER_THAN_EQUAL]: MoreThanOrEqual,
        };

        const filteredBullFeatures = await this.repository.find({
            where: [
                ...forms.map((form) => {
                    return {
                        profile_item_id: form.profile_item_id,
                        value: operatorsMap[form.operator](form.value),
                    };
                }),
            ],
            relations: ["bull"],
        });

        console.log(filteredBullFeatures);

        const matchingBulls: Bull[] = [];

        const profileItemIdsSet = new Set(forms.map((form) => form.profile_item_id));
        const profileItemIdsArray = Array.from(profileItemIdsSet);

        console.log(profileItemIdsArray);

        const bullIds = new Set(filteredBullFeatures.map((bullFeature) => bullFeature.bull_id));

        console.log(bullIds);

        bullIds.forEach((bullId) => {
            const currentBullFeatures = filteredBullFeatures.filter(
                (bullFeature) => bullFeature.bull_id === bullId
            );

            console.log(currentBullFeatures);

            const currentProfileItemIds = currentBullFeatures.map(
                (bullFeature) => bullFeature.profile_item_id
            );

            console.log(currentProfileItemIds);

            const match = profileItemIdsArray.every((profileItemId) =>
                currentProfileItemIds.includes(profileItemId)
            );

            console.log(match);

            if (match) {
                matchingBulls.push(currentBullFeatures[0].bull);
            }
        });

        return matchingBulls;
    }
}

export { BullFeaturesRepository };
