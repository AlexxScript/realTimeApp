import { Router } from "express";
import { homeController } from "../controllers/homeController.js";
import { authToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/",authToken,homeController);

export default router;