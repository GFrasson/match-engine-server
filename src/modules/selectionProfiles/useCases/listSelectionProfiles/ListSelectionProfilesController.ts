import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSelectionProfilesUseCase } from "./ListSelectionProfilesUseCase";

class ListSelectionProfilesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSelectionProfilesUseCase = container.resolve(ListSelectionProfilesUseCase);
        const selectionProfiles = await listSelectionProfilesUseCase.execute();

        return response.json(selectionProfiles);
    }
}

export { ListSelectionProfilesController };
