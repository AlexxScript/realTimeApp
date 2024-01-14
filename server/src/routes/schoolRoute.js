import { Router } from 'express';
import { createSchool } from '../controllers/schoolController.js';

const router = Router();

router.post("/newschool",createSchool);

export default router;