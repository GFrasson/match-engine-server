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
                        type: "varchar",
                        name: "first_level_parent",
                        isNullable: true,
                    },
                    {
                        type: "varchar",
                        name: "second_level_parent",
                        isNullable: true,
                    },
                    {
                        type: "varchar",
                        name: "third_level_parent",
                        isNullable: true,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("bulls");
    }
}
