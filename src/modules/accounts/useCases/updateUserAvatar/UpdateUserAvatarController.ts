import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";


class UpdateUserAvatarController {
    async handler(request: Request, respose: Response): Promise<Response> {
       const { id } = request.user;
       const avatar_file = request.file?.filename;
       const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    
       await updateUserAvatarUseCase.execute({ user_id: id, avatar_file});
       
       return respose.status(204).send();
       
    }
}

export { UpdateUserAvatarController }