import { ICreateSelectionProfileDTO } from "@modules/selectionProfiles/dtos/ICreateSelectionProfileDTO";

import { SelectionProfile } from "../infra/typeorm/entities/SelectionProfile";

interface ISelectionProfilesRepository {
    create(data: ICreateSelectionProfileDTO): Promise<SelectionProfile>;
}

export { ISelectionProfilesRepository };
