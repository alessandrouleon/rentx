import { CreateRentalsController } from "@modules/rentals/useCases/createRentals/CreateRentalsController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsUserController";
import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRouters = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsUserController = new ListRentalsUserController();

rentalsRouters.post("/", ensureAuthenticated, createRentalsController.handel);
rentalsRouters.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalsRouters.get("/listAll", ensureAuthenticated, listRentalsUserController.handle);


export { rentalsRouters }
