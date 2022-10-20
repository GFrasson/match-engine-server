import { Router } from "express";

import { bullsRoutes } from "./bulls.routes";
import { selectionProfilesRoutes } from "./selectionProfiles.routes";

const router = Router();

router.use("/bulls", bullsRoutes);
router.use("/selection-profiles", selectionProfilesRoutes);

export { router };
