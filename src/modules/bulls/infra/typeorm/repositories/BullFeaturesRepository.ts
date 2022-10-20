import { Repository } from "typeorm";

import { ICreateBullFeatureDTO } from "@modules/bulls/dtos/ICreateBullFeatureDTO";
import { IBullFeaturesRepository } from "@modules/bulls/repositories/IBullFeaturesRepository";
import AppDataSource from "@shared/infra/typeorm";

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
}

export { BullFeaturesRepository };
