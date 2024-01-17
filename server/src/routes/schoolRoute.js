import { Router } from 'express';
import { createSchool, getKeySchool, validateSchool } from '../controllers/schoolController.js';

const router = Router();

router.post("/newschool",createSchool);
router.post("/validateschool",validateSchool);
router.post("/getkey",getKeySchool);

export default router;