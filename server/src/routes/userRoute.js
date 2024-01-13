import { Router } from "express";
import { createUser, logInUSer } from "../controllers/userController.js";

const router = Router();

router.post('/register',createUser);
router.post('/login',logInUSer);

export default router;