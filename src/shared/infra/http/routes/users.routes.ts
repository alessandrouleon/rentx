import { Router } from "express";
import multer from "multer";
import { CreateUsersController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig);

const createUsersController = new CreateUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRouter.post("/", createUsersController.handler);

usersRouter.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handler);

    usersRouter.get("/profile", ensureAuthenticated, profileUserController.handler);

export { usersRouter}