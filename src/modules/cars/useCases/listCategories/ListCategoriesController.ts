import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


class ListCategoriesController {

    async handler(request: Request, response: Response): Promise<Response> {
        const listCategorisUseCase = container.resolve(ListCategoriesUseCase);

        const all = await listCategorisUseCase.execute();

        return response.json(all);
    };
}

export { ListCategoriesController }