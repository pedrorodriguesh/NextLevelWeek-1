import ItemsController from "./controllers/itemsController";
import PointsController from "./controllers/pointsController";
import express from "express";

const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);
routes.get("/points/:id", pointsController.show);
routes.post("/points", pointsController.create);

export default routes;
