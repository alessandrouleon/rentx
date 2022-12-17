import { CreateRentalsController } from "@modules/rentals/useCases/createRentals/CreateRentalsController";
import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthenticatedAdmin } from "../middlewares/ensureAuthenticatedAdmin";


const rentalsRouters = Router();

const createRentalsController = new CreateRentalsController();

rentalsRouters.post("/", ensureAuthenticated, createRentalsController.handel);

export { rentalsRouters }
