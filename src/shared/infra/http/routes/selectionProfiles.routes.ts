import { Router } from "express";

import { CreateSelectionProfileController } from "@modules/selectionProfiles/useCases/createSelectionProfile/CreateSelectionProfileController";
import { ListSelectionProfilesController } from "@modules/selectionProfiles/useCases/listSelectionProfiles/ListSelectionProfilesController";
import { MatchingController } from "@modules/selectionProfiles/useCases/matching/MatchingController";

const selectionProfilesRoutes = Router();

const createSelectionProfileController = new CreateSelectionProfileController();
const listSelectionProfilesController = new ListSelectionProfilesController();
const matchingController = new MatchingController();

selectionProfilesRoutes.post("/", createSelectionProfileController.handle);

selectionProfilesRoutes.get("/", listSelectionProfilesController.handle);

selectionProfilesRoutes.get("/:selection_profile_id", matchingController.handle);

export { selectionProfilesRoutes };
