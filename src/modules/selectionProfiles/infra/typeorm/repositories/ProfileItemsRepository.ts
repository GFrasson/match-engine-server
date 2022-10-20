import { Repository } from "typeorm";

import { ICreateProfileItemDTO } from "@modules/selectionProfiles/dtos/ICreateProfileItemDTO";
import { IProfileItemsRepository } from "@modules/selectionProfiles/repositories/IProfileItemsRepository";
import AppDataSource from "@shared/infra/typeorm";

import { ProfileItem } from "../entities/ProfileItem";

class ProfileItemsRepository implements IProfileItemsRepository {
    private repository: Repository<ProfileItem>;

    constructor() {
        this.repository = AppDataSource.getRepository(ProfileItem);
    }

    async create({ attribute }: ICreateProfileItemDTO): Promise<ProfileItem> {
        const profileItem = this.repository.create({
            attribute,
        });

        await this.repository.save(profileItem);

        return profileItem;
    }

    async findByAttribute(attribute: string): Promise<ProfileItem> {
        const profileItem = await this.repository.findOneBy({
            attribute,
        });

        return profileItem;
    }
}

export { ProfileItemsRepository };
