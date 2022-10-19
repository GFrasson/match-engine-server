import { DataSource, DatabaseType } from "typeorm";

import { Bull } from "@modules/bulls/infra/typeorm/entities/Bull";

import "dotenv/config";

import { FormItem } from "@modules/forms/infra/typeorm/entities/FormItem";

import { CreateBulls1666212336611 } from "./migrations/1666212336611-CreateBulls";
import { CreateFormItems1666213532115 } from "./migrations/1666213532115-CreateFormItems";

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
    entities: [Bull, FormItem],
    migrations: [CreateBulls1666212336611, CreateFormItems1666213532115],
});

export function createConnection(): Promise<DataSource> {
    return AppDataSource.initialize();
}

export default AppDataSource;
