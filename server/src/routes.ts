import ItemsController from "./controllers/itemsController";
import PointsController from "./controllers/pointsController";
import express from "express";
import multer from 'multer'
import multerConfig from './config/multer'

const routes = express.Router();

const upload = multer(multerConfig)

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);


routes.get("/points/:id", pointsController.show);

routes.post("/points", upload.single('image') ,pointsController.create);


routes.get("/points", pointsController.index);

export default routes;
