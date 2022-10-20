import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { Operator } from "@modules/selectionProfiles/infra/typeorm/enums/Operator";

export class CreateForms1666216312481 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "forms",
                columns: [
                    {
                        type: "uuid",
                        name: "id",
                        isPrimary: true,
                    },
                    {
                        type: "uuid",
                        name: "selection_profile_id",
                    },
                    {
                        type: "uuid",
                        name: "profile_item_id",
                    },
                    {
                        type: "float",
                        name: "value",
                    },
                    {
                        type: "enum",
                        name: "operator",
                        enum: Object.values(Operator),
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKFormSelectionProfile",
                        referencedTableName: "selection_profiles",
                        referencedColumnNames: ["id"],
                        columnNames: ["selection_profile_id"],
                        onDelete: "RESTRICT",
                        onUpdate: "RESTRICT",
                    },
                    {
                        name: "FKFormProfileItem",
                        referencedTableName: "profile_items",
                        referencedColumnNames: ["id"],
                        columnNames: ["profile_item_id"],
                        onDelete: "RESTRICT",
                        onUpdate: "RESTRICT",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("forms");
    }
}
