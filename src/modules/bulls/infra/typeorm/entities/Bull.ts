import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

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

    @Column()
    ptal?: number;

    @Column()
    ptat?: number;

    @Column()
    udder_index?: number;

    @Column()
    conformation_index?: number;

    @Column()
    dpr?: number;

    @Column()
    productive_life?: number;

    @Column()
    legs_composition?: number;

    @Column()
    beta_casein: boolean;

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
