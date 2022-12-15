import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CrceateCarController } from "@modules/cars/useCases/creatCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listCars/ListAvailableCarsController";
import { UploadCarImagensController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagensController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAuthenticatedAdmin } from "../middlewares/ensureAuthenticatedAdmin";

const carsRoutes = Router();

const uploadCar = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CrceateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagensController = new UploadCarImagensController();

carsRoutes.post("/", ensureAuthenticated, ensureAuthenticatedAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAuthenticatedAdmin, createCarSpecificationController.handle);
carsRoutes.post("/imagens/:id",ensureAuthenticated, ensureAuthenticatedAdmin, uploadCar.array("images"), uploadCarImagensController.handle);

export { carsRoutes }