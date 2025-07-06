import express from 'express';
import { Register, Login, Logout, UpdateUser } from '../controllers/authController.js';



const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.put("/update", UpdateUser);

export default router;