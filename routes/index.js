// routes/index.js

import express from "express";
import profileRoutes from "../services/profile/profileRoutes.js";
import authService from "../services/auth/authService.js"; // if you use this

const router = express.Router();

router.use(authService); // optional
router.use("/profile", profileRoutes);

export default router;
