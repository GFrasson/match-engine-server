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
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
