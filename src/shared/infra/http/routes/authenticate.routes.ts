import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokensController = new RefreshTokenController();

authenticateRouter.post("/sessions", authenticateUserController.handler);
authenticateRouter.post("/refresh-token", refreshTokensController.handle);


export { authenticateRouter }