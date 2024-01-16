import { Router } from 'express';
import { createSchool, validateSchool } from '../controllers/schoolController.js';

const router = Router();

router.post("/newschool",createSchool);
router.post("/validateschool",validateSchool);

export default router;