import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateBullUseCase } from "./CreateBullUseCase";

class CreateBullController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            register_id,
            name,
            gender,
            first_level_parent,
            second_level_parent,
            third_level_parent,
            profile_items,
        } = request.body;

        const createBullUseCase = container.resolve(CreateBullUseCase);
        const bull = await createBullUseCase.execute({
            register_id,
            name,
            gender,
            first_level_parent,
            second_level_parent,
            third_level_parent,
            profile_items,
        });

        return response.status(201).json(bull);
    }
}

export { CreateBullController };
