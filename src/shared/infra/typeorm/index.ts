import "dotenv/config";
import { DataSource, DatabaseType } from "typeorm";

import { Bull } from "@modules/bulls/infra/typeorm/entities/Bull";
import { BullFeature } from "@modules/bulls/infra/typeorm/entities/BullFeature";
import { Form } from "@modules/selectionProfiles/infra/typeorm/entities/Form";
import { ProfileItem } from "@modules/selectionProfiles/infra/typeorm/entities/ProfileItem";
import { SelectionProfile } from "@modules/selectionProfiles/infra/typeorm/entities/SelectionProfile";

import { CreateBulls1666212336611 } from "./migrations/1666212336611-CreateBulls";
import { CreateProfileItems1666213532115 } from "./migrations/1666213532115-CreateProfileItems";
import { CreateSelectionProfiles1666213532125 } from "./migrations/1666213532125-CreateSelectionProfiles";
import { CreateForms1666216312481 } from "./migrations/1666216312481-CreateForms";
import { CreateBullFeatures1666223297687 } from "./migrations/1666223297687-CreateBullFeatures";

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
    entities: [Bull, ProfileItem, SelectionProfile, Form, BullFeature],
    migrations: [
        CreateBulls1666212336611,
        CreateProfileItems1666213532115,
        CreateSelectionProfiles1666213532125,
        CreateForms1666216312481,
        CreateBullFeatures1666223297687,
    ],
});

export function createConnection(): Promise<DataSource> {
    return AppDataSource.initialize();
}

export default AppDataSource;
