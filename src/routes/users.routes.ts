import { CreateUsersController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { Router } from "express";

const usersRouter = Router();

const createUsersController = new CreateUsersController();

usersRouter.post("/", createUsersController.handler);

export { usersRouter}