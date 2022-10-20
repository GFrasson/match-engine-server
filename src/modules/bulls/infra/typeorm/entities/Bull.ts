import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
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
    first_level_parent_id?: string;

    @ManyToOne(() => Bull, (bull) => bull.id, { nullable: true })
    first_level_parent?: Bull;

    @Column()
    second_level_parent_id?: string;

    @ManyToOne(() => Bull, (bull) => bull.id, { nullable: true })
    second_level_parent?: Bull;

    @Column()
    third_level_parent_id?: string;

    @ManyToOne(() => Bull, (bull) => bull.id, { nullable: true })
    third_level_parent?: Bull;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Bull };
