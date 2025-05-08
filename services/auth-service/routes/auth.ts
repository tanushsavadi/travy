import { Router, Request, Response } from "express";
import supabase from "../supabaseClient.js";

const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, university, budget } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      { email, password }
    );

    if (signUpError || !signUpData.user) {
      console.error("❌ Supabase Auth signup failed:", signUpError?.message);
      res
        .status(400)
        .json({ error: signUpError?.message || "Registration failed." });
      return;
    }

    const userId = signUpData.user.id;

    const { error: insertError } = await supabase.from("users").insert({
      user_id: userId,
      email,
      name,
      university,
      budget: budget === "" ? null : budget,
      transportModes: [],
      preferredDests: [],
      ridesharePreferences: [],
    });

    if (insertError) {
      console.error("❌ User profile creation failed:", insertError.message);

      await supabase.auth.admin.deleteUser(userId); // clean up auth user
      res.status(500).json({ error: "Failed to create user profile." });
      return;
    }

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: userId,
        email,
        name,
        university,
        budget: budget === "" ? null : budget,
      },
    });
  } catch (err) {
    console.error("Unexpected error during registration:", err);
    res.status(500).json({ error: "Unexpected error during registration." });
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
