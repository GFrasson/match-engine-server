import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateBullUseCase } from "./CreateBullUseCase";

class CreateBullController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            register_id,
            name,
            gender,
            first_level_parent_id,
            second_level_parent_id,
            third_level_parent_id,
            profile_items,
        } = request.body;

        const createBullUseCase = container.resolve(CreateBullUseCase);
        const bull = await createBullUseCase.execute({
            register_id,
            name,
            gender,
            first_level_parent_id,
            second_level_parent_id,
            third_level_parent_id,
            profile_items,
        });

        return response.status(201).json(bull);
    }
}

export { CreateBullController };
