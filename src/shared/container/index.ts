import { container } from "tsyringe";
import "reflect-metadata";

import { BullFeaturesRepository } from "@modules/bulls/infra/typeorm/repositories/BullFeaturesRepository";
import { BullsRepository } from "@modules/bulls/infra/typeorm/repositories/BullsRepository";
import { IBullFeaturesRepository } from "@modules/bulls/repositories/IBullFeaturesRepository";
import { IBullsRepository } from "@modules/bulls/repositories/IBullsRepository";
import { FormsRepository } from "@modules/selectionProfiles/infra/typeorm/repositories/FormsRepository";
import { ProfileItemsRepository } from "@modules/selectionProfiles/infra/typeorm/repositories/ProfileItemsRepository";
import { SelectionProfileRepository } from "@modules/selectionProfiles/infra/typeorm/repositories/SelectionProfilesRepository";
import { IFormsRepository } from "@modules/selectionProfiles/repositories/IFormsRepository";
import { IProfileItemsRepository } from "@modules/selectionProfiles/repositories/IProfileItemsRepository";
import { ISelectionProfilesRepository } from "@modules/selectionProfiles/repositories/ISelectionProfilesRepository";

container.registerSingleton<IBullsRepository>("BullsRepository", BullsRepository);

container.registerSingleton<IBullFeaturesRepository>(
    "BullFeaturesRepository",
    BullFeaturesRepository
);

container.registerSingleton<IFormsRepository>("FormsRepository", FormsRepository);

container.registerSingleton<IProfileItemsRepository>(
    "ProfileItemsRepository",
    ProfileItemsRepository
);

container.registerSingleton<ISelectionProfilesRepository>(
    "SelectionProfilesRepository",
    SelectionProfileRepository
);
