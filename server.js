import { config } from "dotenv";
import app from "./app.js";
import "./db/db.js";

config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
