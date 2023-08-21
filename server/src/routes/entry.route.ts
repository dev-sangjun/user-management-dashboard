import { Router } from "express";
import { entryController } from "../controllers";

const entryRoute = Router();
entryRoute.get("/", entryController.getEntries);
entryRoute.post("/", entryController.createEntry);

export default entryRoute;
