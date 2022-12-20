import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentaluseCase } from "./DevolutionRentalUseCase";


class DevolutionRentalController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;
        const devolutionrentalUseCase = container.resolve(DevolutionRentaluseCase);
        const rental = await devolutionrentalUseCase.execute({ user_id, id });

        return response.status(200).json(rental);
    }
}

export { DevolutionRentalController }