import { ICreateFormDTO } from "../dtos/ICreateFormDTO";
import { Form } from "../infra/typeorm/entities/Form";

interface IFormsRepository {
    create(data: ICreateFormDTO): Promise<Form>;
}

export { IFormsRepository };
