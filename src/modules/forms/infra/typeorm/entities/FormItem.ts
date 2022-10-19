import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Operator } from "../enums/Operator";

@Entity("form_items")
class FormItem {
    @PrimaryColumn()
    id: string;

    @Column()
    attribute: string;

    @Column()
    value: number;

    @Column({ type: "enum", enum: Operator })
    operator: Operator;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { FormItem };
