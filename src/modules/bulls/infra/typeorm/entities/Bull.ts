import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
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
    @JoinColumn({ name: "first_level_parent_id" })
    first_level_parent?: Bull;

    @Column()
    second_level_parent_id?: string;

    @ManyToOne(() => Bull, (bull) => bull.id, { nullable: true })
    @JoinColumn({ name: "second_level_parent_id" })
    second_level_parent?: Bull;

    @Column()
    third_level_parent_id?: string;

    @ManyToOne(() => Bull, (bull) => bull.id, { nullable: true })
    @JoinColumn({ name: "third_level_parent_id" })
    third_level_parent?: Bull;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Bull };
