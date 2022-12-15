import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticatedAdmin } from "../middlewares/ensureAuthenticatedAdmin";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

//specificationRoutes.use(ensureAuthenticated); //Dessa forma todas as rotas que estivem abaixo ficam authenticadas
specificationRoutes.post("/", ensureAuthenticated, ensureAuthenticatedAdmin, createSpecificationController.handle);

export { specificationRoutes }

