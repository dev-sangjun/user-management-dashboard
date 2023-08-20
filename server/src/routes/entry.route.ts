import { Router } from "express";
import { entryController } from "../controllers";

const entryRoute = Router();
entryRoute.post("/", entryController.createEntry);

export default entryRoute;
