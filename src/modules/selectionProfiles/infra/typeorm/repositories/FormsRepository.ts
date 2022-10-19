import { Repository } from "typeorm";

import { ICreateFormDTO } from "@modules/selectionProfiles/dtos/ICreateForm";
import { IFormsRepository } from "@modules/selectionProfiles/repositories/IFormsRepository";
import AppDataSource from "@shared/infra/typeorm";

import { Form } from "../entities/Form";

class FormsRepository implements IFormsRepository {
    private repository: Repository<Form>;

    constructor() {
        this.repository = AppDataSource.getRepository(Form);
    }

    async create({
        selection_profile_id,
        profile_item_id,
        value,
        operator,
    }: ICreateFormDTO): Promise<Form> {
        const form = this.repository.create({
            selection_profile_id,
            profile_item_id,
            value,
            operator,
        });

        await this.repository.save(form);

        return form;
    }
}

export { FormsRepository };
