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
