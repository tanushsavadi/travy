import express from "express";
const router = express.Router();

router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  const {
    data: { user },
    error,
  } = await req.app.locals.supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  res.json({ success: true, user });
});

export default router;
