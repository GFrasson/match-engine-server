import { Repository } from "typeorm";

import { ICreateProfileItem } from "@modules/selectionProfiles/dtos/ICreateProfileItem";
import { IProfileItemsRepository } from "@modules/selectionProfiles/repositories/IProfileItemsRepository";
import AppDataSource from "@shared/infra/typeorm";

import { ProfileItem } from "../entities/ProfileItem";

class ProfileItemsRepository implements IProfileItemsRepository {
    private repository: Repository<ProfileItem>;

    constructor() {
        this.repository = AppDataSource.getRepository(ProfileItem);
    }

    async create({ attribute }: ICreateProfileItem): Promise<ProfileItem> {
        const profileItem = this.repository.create({
            attribute,
        });

        await this.repository.save(profileItem);

        return profileItem;
    }
}

export { ProfileItemsRepository };
