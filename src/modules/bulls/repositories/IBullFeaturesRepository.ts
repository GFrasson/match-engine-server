import { ICreateBullFeatureDTO } from "../dtos/ICreateBullFeatureDTO";
import { BullFeature } from "../infra/typeorm/entities/BullFeature";

interface IBullFeaturesRepository {
    create(data: ICreateBullFeatureDTO): Promise<BullFeature>;
}

export { IBullFeaturesRepository };
