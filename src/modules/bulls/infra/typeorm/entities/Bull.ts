import { Column, Entity, PrimaryColumn } from "typeorm";
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
    ptal: number;

    @Column()
    ptat: number;

    @Column()
    udder_index: number;

    @Column()
    conformation_index: number;

    @Column()
    dpr: number;

    @Column()
    productive_life: number;

    @Column()
    legs_composition: number;

    @Column()
    beta_casein: boolean;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Bull };
