import { Router } from "express";

import { bullsRoutes } from "./bulls.routes";

const router = Router();

router.use("/bulls", bullsRoutes);

export { router };
