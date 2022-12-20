import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsUserUseCase } from "./ListRentalsUserUseCase";


class ListRentalsUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listRentalsUserUseCase = container.resolve(ListRentalsUserUseCase);
        const rental = await listRentalsUserUseCase.execute(id);

        return response.json(rental);
    }
}

export { ListRentalsUserController }