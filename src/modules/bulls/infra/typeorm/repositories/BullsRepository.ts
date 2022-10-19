import { Repository } from "typeorm";

import { ICreateBullDTO } from "@modules/bulls/dtos/ICreateBullDTO";
import { IBullsRepository } from "@modules/bulls/repositories/IBullsRepository";
import AppDataSource from "@shared/infra/typeorm";

import { Bull } from "../entities/Bull";

class BullsRepository implements IBullsRepository {
    private repository: Repository<Bull>;

    constructor() {
        this.repository = AppDataSource.getRepository(Bull);
    }

    async create({
        register_id,
        name,
        gender,
        beta_casein,
        ptal,
        ptat,
        udder_index,
        conformation_index,
        dpr,
        productive_life,
        legs_composition,
        first_level_parent_id,
        second_level_parent_id,
        third_level_parent_id,
    }: ICreateBullDTO): Promise<Bull> {
        const bull = this.repository.create({
            register_id,
            name,
            gender,
            beta_casein,
            ptal,
            ptat,
            udder_index,
            conformation_index,
            dpr,
            productive_life,
            legs_composition,
            first_level_parent_id,
            second_level_parent_id,
            third_level_parent_id,
        });

        await this.repository.save(bull);

        return bull;
    }
}

export { BullsRepository };
