import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { categoiyesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specification.routes";
import { usersRouter } from "./users.routes";

const routes = Router();

routes.use("/categories", categoiyesRoutes);
routes.use("/specification", specificationRoutes);
routes.use("/users", usersRouter);
routes.use(authenticateRouter);

export { routes }
