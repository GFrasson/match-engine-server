import { Form } from "@modules/selectionProfiles/infra/typeorm/entities/Form";

import { ICreateBullFeatureDTO } from "../dtos/ICreateBullFeatureDTO";
import { Bull } from "../infra/typeorm/entities/Bull";
import { BullFeature } from "../infra/typeorm/entities/BullFeature";

interface IBullFeaturesRepository {
    create(data: ICreateBullFeatureDTO): Promise<BullFeature>;
    matching(forms: Form[]): Promise<Bull[]>;
    findByBullId(bull_id: string): Promise<BullFeature[]>;
}

export { IBullFeaturesRepository };
