import { Router } from "express";
import multer from "multer";
import { CreateUsersController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig);

const createUsersController = new CreateUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
usersRouter.post("/", createUsersController.handler);

usersRouter.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handler);

export { usersRouter}