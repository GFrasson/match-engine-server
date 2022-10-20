import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSelectionProfileUseCase } from "./CreateSelectionProfileUseCase";

class CreateSelectionProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, forms } = request.body;

        const createSelectionProfileUseCase = container.resolve(CreateSelectionProfileUseCase);
        await createSelectionProfileUseCase.execute({
            name,
            forms,
        });

        return response.status(201).send();
    }
}

export { CreateSelectionProfileController };
