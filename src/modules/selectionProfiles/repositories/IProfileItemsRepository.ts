import { ICreateProfileItemDTO } from "../dtos/ICreateProfileItemDTO";
import { ProfileItem } from "../infra/typeorm/entities/ProfileItem";

interface IProfileItemsRepository {
    create(data: ICreateProfileItemDTO): Promise<ProfileItem>;
}

export { IProfileItemsRepository };
