import express from "express";
import logger from "morgan";
import cors from "cors";
import errorGlobal from "./middlewares/errorGlobal.js";
import errorNotFound from "./middlewares/errorNotFound.js";

import "dotenv/config";

// import authRouter from "./routes/api/auth-router.js";
import waterRouter from "./routes/api/water-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRouter);
app.use("/api/water", waterRouter);

app.use(errorNotFound);
app.use(errorGlobal);

export default app;
//
