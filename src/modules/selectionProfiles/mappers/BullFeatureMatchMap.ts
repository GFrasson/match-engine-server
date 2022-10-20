import { Bull } from "@modules/bulls/infra/typeorm/entities/Bull";

import { IResponse } from "../useCases/matching/MatchingUseCase";

class BullFeatureMatchMap {
    static toDTO(bulls: Bull[] & { bull_features: { [key: string]: number } }): IResponse[] {
        return bulls.map((bull) => {
            const bullFeatures = {};

            bull.bull_features.forEach((bullFeature) => {
                bullFeatures[bullFeature.profile_item.attribute] = bullFeature.value;
            });

            return {
                register_id: bull.register_id,
                name: bull.name,
                gender: bull.gender,
                first_level_parent: bull.first_level_parent,
                second_level_parent: bull.second_level_parent,
                third_level_parent: bull.third_level_parent,
                bull_features: bullFeatures,
            };
        });
    }
}

export { BullFeatureMatchMap };
