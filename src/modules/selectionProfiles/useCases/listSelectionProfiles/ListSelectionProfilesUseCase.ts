import { inject, injectable } from "tsyringe";

import { SelectionProfile } from "@modules/selectionProfiles/infra/typeorm/entities/SelectionProfile";
import { ISelectionProfilesRepository } from "@modules/selectionProfiles/repositories/ISelectionProfilesRepository";

@injectable()
class ListSelectionProfilesUseCase {
    constructor(
        @inject("SelectionProfilesRepository")
        private selectionProfilesRepository: ISelectionProfilesRepository
    ) {}

    async execute(): Promise<SelectionProfile[]> {
        const selectionProfiles = await this.selectionProfilesRepository.list();

        return selectionProfiles;
    }
}

export { ListSelectionProfilesUseCase };
