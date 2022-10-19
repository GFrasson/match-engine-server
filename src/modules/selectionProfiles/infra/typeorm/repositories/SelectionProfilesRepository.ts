import { Repository } from "typeorm";

import { ICreateSelectionProfileDTO } from "@modules/selectionProfiles/dtos/ICreateSelectionProfileDTO";
import { ISelectionProfilesRepository } from "@modules/selectionProfiles/repositories/ISelectionProfilesRepository";
import AppDataSource from "@shared/infra/typeorm";

import { SelectionProfile } from "../entities/SelectionProfile";

class SelectionProfileRepository implements ISelectionProfilesRepository {
    private repository: Repository<SelectionProfile>;

    constructor() {
        this.repository = AppDataSource.getRepository(SelectionProfile);
    }

    async create({ name }: ICreateSelectionProfileDTO): Promise<SelectionProfile> {
        const selectionProfile = this.repository.create({
            name,
        });

        await this.repository.save(selectionProfile);

        return selectionProfile;
    }
}

export { SelectionProfileRepository };
