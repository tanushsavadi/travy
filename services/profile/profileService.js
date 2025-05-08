// services/profile/profileService.js

export async function getProfile(req, res) {
  const supabase = req.app.locals.supabase;
  const { user_id } = req.params;

  console.log("🔍 [GET] Fetching profile for user_id:", user_id);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id);

  console.log("📦 Supabase response:", data);

  if (error) {
    console.error("❌ Supabase query error:", error.message);
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    console.warn("⚠️ No profile found.");
    return res.status(404).json({ error: "Profile not found." });
  }

  if (data.length > 1) {
    console.warn("⚠️ Multiple profiles found for user_id:", user_id);
    return res.status(409).json({ error: "Duplicate profiles found." });
  }

  res.json(data[0]);
}

export async function updateProfile(req, res) {
  const supabase = req.app.locals.supabase;
  const { user_id } = req.params;
  const updates = req.body;

  console.log("✏️ [PUT] Updating profile for user_id:", user_id);
  console.log("📝 Updates:", updates);

  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("user_id", user_id)
    .select();

  if (error) {
    console.error("❌ Supabase update error:", error.message);
    return res.status(400).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    console.warn("⚠️ No profile updated.");
    return res
      .status(404)
      .json({ error: "Profile not found or update failed." });
  }

  res.json(data[0]);
}
