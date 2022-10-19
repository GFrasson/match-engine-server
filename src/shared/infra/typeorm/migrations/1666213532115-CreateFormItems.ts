import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { Operator } from "@modules/forms/infra/typeorm/enums/Operator";

export class CreateFormItems1666213532115 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "form_items",
                columns: [
                    {
                        type: "uuid",
                        name: "id",
                        isPrimary: true,
                    },
                    {
                        type: "varchar",
                        name: "attribute",
                    },
                    {
                        type: "numeric",
                        name: "value",
                    },
                    {
                        type: "enum",
                        name: "operator",
                        enum: Object.values(Operator),
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
