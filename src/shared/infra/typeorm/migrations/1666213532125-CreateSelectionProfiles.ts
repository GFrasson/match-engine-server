import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSelectionProfiles1666213532125 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "selection_profiles",
                columns: [
                    {
                        type: "uuid",
                        name: "id",
                        isPrimary: true,
                    },
                    {
                        type: "varchar",
                        name: "name",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("selection_profiles");
    }
}
