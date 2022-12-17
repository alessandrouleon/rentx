import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoiyesRoutes } from "./categories.routes";
import { rentalsRouters } from "./rental.routes";
import { specificationRoutes } from "./specification.routes";
import { usersRouter } from "./users.routes";

const routes = Router();

routes.use("/categories", categoiyesRoutes);
routes.use("/specification", specificationRoutes);
routes.use("/users", usersRouter);
routes.use("/cars", carsRoutes);
routes.use("/rentals", rentalsRouters);
routes.use(authenticateRouter);

export { routes }
