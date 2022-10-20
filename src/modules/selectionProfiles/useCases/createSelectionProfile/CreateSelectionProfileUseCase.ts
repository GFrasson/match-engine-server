import { inject, injectable } from "tsyringe";

import { Operator } from "@modules/selectionProfiles/infra/typeorm/enums/Operator";
import { IFormsRepository } from "@modules/selectionProfiles/repositories/IFormsRepository";
import { IProfileItemsRepository } from "@modules/selectionProfiles/repositories/IProfileItemsRepository";
import { ISelectionProfilesRepository } from "@modules/selectionProfiles/repositories/ISelectionProfilesRepository";

interface ICreateSelectionProfileRequest {
    name: string;
    forms: Array<{
        profile_items: {
            [attribute: string]: number;
        };
        operator: Operator;
    }>;
}

@injectable()
class CreateSelectionProfileUseCase {
    constructor(
        @inject("SelectionProfilesRepository")
        private selectionProfileRepository: ISelectionProfilesRepository,
        @inject("ProfileItemsRepository")
        private profileItemsRepository: IProfileItemsRepository,
        @inject("FormsRepository")
        private formsRepository: IFormsRepository
    ) {}

    async execute({ name, forms }: ICreateSelectionProfileRequest): Promise<void> {
        const selectionProfile = await this.selectionProfileRepository.create({
            name,
        });

        forms.forEach((form) => {
            Object.entries(form.profile_items).map(async ([attributeName, attributeValue]) => {
                const profileItem = await this.profileItemsRepository.findByAttribute(
                    attributeName
                );

                if (profileItem) {
                    this.formsRepository.create({
                        operator: form.operator,
                        profile_item_id: profileItem.id,
                        selection_profile_id: selectionProfile.id,
                        value: attributeValue,
                    });
                }
            });
        });
    }
}

export { CreateSelectionProfileUseCase, ICreateSelectionProfileRequest };
