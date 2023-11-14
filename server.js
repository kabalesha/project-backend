import "dotenv/config";
import app from "./app.js";
import "./db/db.js";

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
