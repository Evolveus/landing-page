import "dotenv/config";
import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { handleContactRequest } from "./contact.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const port = Number(process.env.PORT || 4174);
const host = process.env.HOST || "127.0.0.1";

const app = express();

app.use(express.json({ limit: "32kb" }));
app.post("/api/contact", handleContactRequest);
app.options("/api/contact", handleContactRequest);

app.use(express.static(distDir));
app.use((_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(port, host, () => {
  console.log(`Evolveus site listening at http://${host}:${port}`);
});
