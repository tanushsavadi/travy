import { Router, Request, Response } from "express";
import supabase from "../supabaseClient.js";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(201).json({ user: data });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    res.status(401).json({ error: error.message });
  } else {
    res.status(200).json({ session: data.session, user: data.user });
  }
});

export default router;
