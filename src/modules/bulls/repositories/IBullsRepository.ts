import { ICreateBullDTO } from "../dtos/ICreateBullDTO";
import { Bull } from "../infra/typeorm/entities/Bull";

interface IBullsRepository {
    create(data: ICreateBullDTO): Promise<Bull>;
    findByRegisterId(register_id: string): Promise<Bull>;
}

export { IBullsRepository };
