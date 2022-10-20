import { Router } from "express";

import { CreateSelectionProfileController } from "@modules/selectionProfiles/useCases/createSelectionProfile/CreateSelectionProfileController";

const selectionProfilesRoutes = Router();

const createSelectionProfileController = new CreateSelectionProfileController();

selectionProfilesRoutes.post("/", createSelectionProfileController.handle);

export { selectionProfilesRoutes };
