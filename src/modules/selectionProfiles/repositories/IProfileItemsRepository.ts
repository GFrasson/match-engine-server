import { ICreateProfileItemDTO } from "../dtos/ICreateProfileItemDTO";
import { ProfileItem } from "../infra/typeorm/entities/ProfileItem";

interface IProfileItemsRepository {
    create(data: ICreateProfileItemDTO): Promise<ProfileItem>;
    findByAttribute(attribute: string): Promise<ProfileItem>;
}

export { IProfileItemsRepository };
