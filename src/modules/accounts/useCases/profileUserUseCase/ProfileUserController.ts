import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUserUseCase } from "./ProfileUserUseCase";



class ProfileUserController {

    public async handler(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const profileUseruseCase = container.resolve(ProfileUserUseCase);

        const user = await profileUseruseCase.execute(id);

        return response.status(201).json(user);
    }
}


export { ProfileUserController }