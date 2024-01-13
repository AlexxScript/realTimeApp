import { Router } from "express";
import { createUser } from "../controllers/userController.js";

const router = Router();

router.get('/register',createUser);

export default router;