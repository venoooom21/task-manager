import express from 'express';
import { loginUser, logoutUser, signUp } from '../controllers/userController.js';

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", loginUser);
router.post("/logout", logoutUser);


export default router;