import { ICreateProfileItem } from "../dtos/ICreateProfileItem";
import { ProfileItem } from "../infra/typeorm/entities/ProfileItem";

interface IProfileItemsRepository {
    create(data: ICreateProfileItem): Promise<ProfileItem>;
}

export { IProfileItemsRepository };
