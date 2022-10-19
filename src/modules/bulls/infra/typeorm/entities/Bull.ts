import { Entity } from "typeorm";

@Entity("bulls")
class Bull {
    id: string;

    name: string;
}

export { Bull };
