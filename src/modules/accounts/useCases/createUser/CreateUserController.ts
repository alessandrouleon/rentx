import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUseruseCase } from "./CreateUserUseCase";


class CreateUsersController {

    async handler(request: Request, response: Response): Promise<Response> {
        const { name, email, driver_license, password } = request.body;
        const creteUserUseCase = container.resolve(CreateUseruseCase);

        await creteUserUseCase.execute({
            name,
            email,
            driver_license,
            password
        });
        return response.status(201).send();
    }

}

export { CreateUsersController }