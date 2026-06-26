import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/upload.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Backend Running 🚀");
});

app.use("/api/upload", uploadRoutes);

export default app;