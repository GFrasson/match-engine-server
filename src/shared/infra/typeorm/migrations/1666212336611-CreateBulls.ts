import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBulls1666212336611 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "bulls",
                columns: [
                    {
                        type: "uuid",
                        name: "id",
                        isPrimary: true,
                    },
                    {
                        type: "varchar",
                        name: "register_id",
                        isUnique: true,
                    },
                    {
                        type: "varchar",
                        name: "name",
                    },
                    {
                        type: "varchar",
                        name: "gender",
                    },
                    {
                        type: "numeric",
                        name: "ptal",
                        isNullable: true,
                    },
                    {
                        type: "numeric",
                        name: "ptat",
                        isNullable: true,
                    },
                    {
                        type: "numeric",
                        name: "udder_index",
                        isNullable: true,
                    },
                    {
                        type: "numeric",
                        name: "conformation_index",
                        isNullable: true,
                    },
                    {
                        type: "numeric",
                        name: "dpr",
                        isNullable: true,
                    },
                    {
                        type: "numeric",
                        name: "productive_life",
                        isNullable: true,
                    },
                    {
                        type: "numeric",
                        name: "legs_composition",
                        isNullable: true,
                    },
                    {
                        type: "boolean",
                        name: "beta_casein",
                        isNullable: true,
                    },
                    {
                        type: "uuid",
                        name: "first_level_parent",
                        isNullable: true,
                    },
                    {
                        type: "uuid",
                        name: "second_level_parent",
                        isNullable: true,
                    },
                    {
                        type: "uuid",
                        name: "third_level_parent",
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKFirstLevelParent",
                        referencedTableName: "bulls",
                        referencedColumnNames: ["id"],
                        columnNames: ["first_level_parent"],
                        onDelete: "RESTRICT",
                        onUpdate: "RESTRICT",
                    },
                    {
                        name: "FKSecondLevelParent",
                        referencedTableName: "bulls",
                        referencedColumnNames: ["id"],
                        columnNames: ["second_level_parent"],
                        onDelete: "RESTRICT",
                        onUpdate: "RESTRICT",
                    },
                    {
                        name: "FKThirdLevelParent",
                        referencedTableName: "bulls",
                        referencedColumnNames: ["id"],
                        columnNames: ["third_level_parent"],
                        onDelete: "RESTRICT",
                        onUpdate: "RESTRICT",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("bulls");
    }
}
