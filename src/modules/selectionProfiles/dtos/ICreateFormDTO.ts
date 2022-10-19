import { Operator } from "../infra/typeorm/enums/Operator";

interface ICreateFormDTO {
    selection_profile_id: string;
    profile_item_id: string;
    value: number;
    operator: Operator;
}

export { ICreateFormDTO };
