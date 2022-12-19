import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsUseruseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listRentalsUserUseCase = container.resolve(ListRentalsUseruseCase);

        const rentals = await listRentalsUserUseCase.execute(id);

        return response.json(rentals);
    }

}

export { ListRentalsByUserController }