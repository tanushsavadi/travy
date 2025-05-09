import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // note: no .ts extension
import permissionsRoutes from "./routes/permissions.js"; // note: no .ts extension

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); // using the exported router
app.use("/permissions", permissionsRoutes);

app.listen(5002, () => {
  console.log("Auth service running on port 5002");
});
