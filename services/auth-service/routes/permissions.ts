import { Router, Request, Response } from "express";
import supabase from "../supabaseClient.js";

const router = Router();

// Grant permission
router.post("/grant", async (req: Request, res: Response) => {
  const { owner_email, granted_to_email } = req.body;

  if (!owner_email || !granted_to_email) {
    res.status(400).json({ error: "Both emails are required." });
    return;
  }

  const { error } = await supabase.from("permissions").insert({
    owner_email,
    granted_to_email,
  });

  if (error) {
    console.error("Error granting permission:", error.message);
    res.status(500).json({ error: "Failed to grant permission." });
    return;
  }

  res.status(201).json({ message: "Permission granted successfully." });
});

// Revoke permission
router.delete("/revoke", async (req: Request, res: Response) => {
  const { owner_email, granted_to_email } = req.body;

  if (!owner_email || !granted_to_email) {
    res.status(400).json({ error: "Both emails are required." });
    return;
  }

  const { error } = await supabase
    .from("permissions")
    .delete()
    .eq("owner_email", owner_email)
    .eq("granted_to_email", granted_to_email);

  if (error) {
    console.error("Error revoking permission:", error.message);
    res.status(500).json({ error: "Failed to revoke permission." });
    return;
  }

  res.status(200).json({ message: "Permission revoked successfully." });
});

// Get contact info if permission exists
router.get("/contact-info", async (req: Request, res: Response) => {
  const { owner_email, requester_email } = req.query;

  if (!owner_email || !requester_email) {
    res.status(400).json({ error: "Both emails are required." });
    return;
  }

  const { data, error } = await supabase
    .from("permissions")
    .select("*")
    .eq("owner_email", owner_email)
    .eq("granted_to_email", requester_email);

  if (error) {
    console.error("Error fetching permission:", error.message);
    res.status(500).json({ error: "Failed to fetch permission." });
    return;
  }

  if (data.length > 0) {
    res.status(200).json({ contact_info: "123-456-7890" }); // Dummy phone number
  } else {
    res.status(403).json({ error: "Permission not granted." });
  }
});

// Delete a user by email
router.delete("/delete-user", async (req: Request, res: Response) => {
    const { email } = req.body;
  
    if (!email) {
      res.status(400).json({ error: "Email is required." });
      return;
    }
  
    // Fetch the user's ID using their email
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", email)
      .single();
  
    if (fetchError || !userData) {
      console.error("Error fetching user ID:", fetchError?.message);
      res.status(404).json({ error: "User not found." });
      return;
    }
  
    const userId = userData.user_id;
  
    // Delete the user from Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
  
    if (authError) {
      console.error("Error deleting user from auth:", authError.message);
      res.status(500).json({ error: "Failed to delete user from auth." });
      return;
    }
  
    // Delete the user's profile from the "users" table
    const { error: profileError } = await supabase.from("users").delete().eq("email", email);
  
    if (profileError) {
      console.error("Error deleting user profile:", profileError.message);
      res.status(500).json({ error: "Failed to delete user profile." });
      return;
    }
  
    // Delete all permissions where the user is either the owner or the grantee
    const { error: permissionsError } = await supabase
      .from("permissions")
      .delete()
      .or(`owner_email.eq.${email},granted_to_email.eq.${email}`);
  
    if (permissionsError) {
      console.error("Error deleting permissions:", permissionsError.message);
      res.status(500).json({ error: "Failed to delete user permissions." });
      return;
    }
  
    res.status(200).json({ message: "User and associated permissions deleted successfully." });
  });

export default router;