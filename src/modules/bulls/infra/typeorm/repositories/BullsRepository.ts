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
        first_level_parent,
        second_level_parent,
        third_level_parent,
    }: ICreateBullDTO): Promise<Bull> {
        const bull = this.repository.create({
            register_id,
            name,
            gender,
            ...(first_level_parent && {
                first_level_parent,
            }),
            ...(second_level_parent && {
                second_level_parent,
            }),
            ...(third_level_parent && {
                third_level_parent,
            }),
        });

        await this.repository.save(bull);

        return bull;
    }

    async findByRegisterId(register_id: string): Promise<Bull> {
        const bull = await this.repository.findOneBy({
            register_id,
        });

        return bull;
    }

    async findByName(name: string): Promise<Bull> {
        const bull = await this.repository.findOneBy({
            name,
        });

        return bull;
    }
}

export { BullsRepository };
