import { Request, Response } from "express";
import { container } from "tsyringe";

import { MatchingUseCase } from "./MatchingUseCase";

class MatchingController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { selection_profile_id } = request.params;

        const { cow_first_level_parent, cow_second_level_parent, cow_third_level_parent } =
            request.query;

        const matchingUseCase = container.resolve(MatchingUseCase);
        const matchingBulls = await matchingUseCase.execute({
            selection_profile_id,
            cow_first_level_parent: cow_first_level_parent as string,
            cow_second_level_parent: cow_second_level_parent as string,
            cow_third_level_parent: cow_third_level_parent as string,
        });

        return response.json(matchingBulls);
    }
}

export { MatchingController };
