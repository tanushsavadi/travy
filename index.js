// index.js (root of project)

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
console.log("🔑 Supabase URL:", process.env.SUPABASE_URL);
console.log(
  "🔑 Supabase ANON KEY:",
  process.env.SUPABASE_ANON_KEY.slice(0, 12),
  "..."
);
app.locals.supabase = supabase;

// ✅ Mount backend API routes
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
