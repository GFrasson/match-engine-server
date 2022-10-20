import { Router } from "express";

import { CreateBullController } from "@modules/bulls/useCases/createBull/CreateBullController";

const bullsRoutes = Router();

const createBullController = new CreateBullController();

bullsRoutes.post("/", createBullController.handle);

export { bullsRoutes };
