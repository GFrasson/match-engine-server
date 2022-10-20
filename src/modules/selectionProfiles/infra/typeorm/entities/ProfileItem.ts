import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { BullFeature } from "@modules/bulls/infra/typeorm/entities/BullFeature";

import { Form } from "./Form";

@Entity("profile_items")
class ProfileItem {
    @PrimaryColumn()
    id: string;

    @Column()
    attribute: string;

    @OneToMany(() => BullFeature, (bullFeature) => bullFeature.profile_item)
    bull_features: BullFeature[];

    @OneToMany(() => Form, (form) => form.profile_item)
    forms: Form[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { ProfileItem };
