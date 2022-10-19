import { DataSource, DatabaseType } from "typeorm";

import { Bull } from "@modules/bulls/infra/typeorm/entities/Bull";

import "dotenv/config";

import { CreateBulls1666212336611 } from "./migrations/1666212336611-CreateBulls";

const dbType: DatabaseType = "mysql";

const AppDataSource = new DataSource({
    type: dbType,
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: Number(process.env.TYPEORM_PORT),
    synchronize: false,
    logging: false,
    entities: [Bull],
    migrations: [CreateBulls1666212336611],
});

export function createConnection(): Promise<DataSource> {
    return AppDataSource.initialize();
}

export default AppDataSource;
