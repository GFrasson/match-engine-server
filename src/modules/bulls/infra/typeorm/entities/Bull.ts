import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { BullFeature } from "./BullFeature";

@Entity("bulls")
class Bull {
    @PrimaryColumn()
    id: string;

    @Column()
    register_id: string;

    @Column()
    name: string;

    @Column()
    gender: string;

    @OneToMany(() => BullFeature, (bullFeature) => bullFeature.bull)
    bull_features: BullFeature[];

    @Column()
    first_level_parent?: string;

    @Column()
    second_level_parent?: string;

    @Column()
    third_level_parent?: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Bull };
