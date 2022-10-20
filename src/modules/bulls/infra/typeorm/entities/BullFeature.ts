import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ProfileItem } from "@modules/selectionProfiles/infra/typeorm/entities/ProfileItem";

import { Bull } from "./Bull";

@Entity("bull_features")
class BullFeature {
    @PrimaryColumn()
    id: string;

    @Column()
    bull_id: string;

    @ManyToOne(() => Bull, (bull) => bull.bull_features)
    bull: Bull;

    @Column()
    profile_item_id: string;

    @ManyToOne(() => ProfileItem, (profileItem) => profileItem.bull_features)
    profile_item: ProfileItem;

    @Column()
    value: number;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { BullFeature };
