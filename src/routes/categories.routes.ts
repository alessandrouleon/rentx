
import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryControlle";
import { ListCategoriesController} from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController"

const categoiyesRoutes = Router();

const upload = multer({
  dest: "./tmp",

});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController =  new ListCategoriesController();

categoiyesRoutes.post("/", createCategoryController.handle);

categoiyesRoutes.get("/", listCategoriesController.handler);

categoiyesRoutes.post("/import", importCategoryController.handle);

export { categoiyesRoutes }; 