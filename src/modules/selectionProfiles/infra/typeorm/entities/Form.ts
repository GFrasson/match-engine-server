import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Operator } from "../enums/Operator";
import { ProfileItem } from "./ProfileItem";
import { SelectionProfile } from "./SelectionProfile";

@Entity("forms")
class Form {
    @PrimaryColumn()
    id: string;

    @Column()
    selection_profile_id: string;

    @ManyToOne(() => SelectionProfile, (selection_profile) => selection_profile.forms)
    @JoinColumn({ name: "selection_profile_id" })
    selection_profile: SelectionProfile;

    @Column()
    profile_item_id: string;

    @ManyToOne(() => ProfileItem, (profile_item) => profile_item.forms)
    @JoinColumn({ name: "profile_item_id" })
    profile_item: ProfileItem;

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

export { Form };
