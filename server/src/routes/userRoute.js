import { Router } from "express";
import { createUser, logInUSer, logOut } from "../controllers/userController.js";

const router = Router();

router.post('/register',createUser);
router.post('/login',logInUSer);
router.post('/logout',logOut);

export default router;