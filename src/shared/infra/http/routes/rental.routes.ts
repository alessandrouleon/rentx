import { CreateRentalsController } from "@modules/rentals/useCases/createRentals/CreateRentalsController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionrentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthenticatedAdmin } from "../middlewares/ensureAuthenticatedAdmin";


const rentalsRouters = Router();

const createRentalsController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRouters.post("/", ensureAuthenticated, createRentalsController.handel);
rentalsRouters.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalsRouters.get("/", ensureAuthenticated, listRentalsByUserController.handle);
export { rentalsRouters }
