import "dotenv/config";
import { DataSource, DatabaseType } from "typeorm";

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
    entities: [],
    migrations: [
    ],
});

export function createConnection(): Promise<DataSource> {
    return AppDataSource.initialize();
}

export default AppDataSource;
