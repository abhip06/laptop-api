import express from "express";
import { prediction } from "../controllers/predictionController.js";

const routes = express.Router();

routes.route("/").post(prediction);

export default routes;