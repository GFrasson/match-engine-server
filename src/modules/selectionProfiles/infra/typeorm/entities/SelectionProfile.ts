import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Form } from "./Form";

@Entity("selection_profiles")
class SelectionProfile {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Form, (form) => form.selection_profile)
    forms: Form[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { SelectionProfile };
