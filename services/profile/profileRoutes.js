// services/profile/profileRoutes.js

import express from "express";
import { getProfile, updateProfile } from "./profileService.js";

const router = express.Router();

router.get("/:user_id", getProfile);
router.put("/:user_id", updateProfile);

export default router;
