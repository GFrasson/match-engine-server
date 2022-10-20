import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBullFeatures1666223297687 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "bull_features",
                columns: [
                    {
                        type: "uuid",
                        name: "id",
                        isPrimary: true,
                    },
                    {
                        type: "uuid",
                        name: "bull_id",
                    },
                    {
                        type: "uuid",
                        name: "profile_item_id",
                    },
                    {
                        type: "float",
                        name: "value",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKFeatureBull",
                        referencedTableName: "bulls",
                        referencedColumnNames: ["id"],
                        columnNames: ["bull_id"],
                        onDelete: "RESTRICT",
                        onUpdate: "RESTRICT",
                    },
                    {
                        name: "FKFeatureProfileItem",
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
        await queryRunner.dropTable("bull_features");
    }
}
