import express from "express";
import logger from "morgan";
import cors from "cors";
import errorGlobal from "./middlewares/errorGlobal.js";
import errorNotFound from "./middlewares/errorNotFound.js";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };


// import authRouter from "./routes/api/auth-router.js";
import waterRouter from "./routes/api/water-router.js";

import userRouter from "./routes/api/user-router.js";
// import moviesRouter from "./routes/api/movies-router.js";


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static("public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

//Documentation swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use("/api/auth", authRouter);

app.use("/api/water", waterRouter);

app.use("/api/user", userRouter);

// app.use("/api/movies", moviesRouter);
// app.use("/api/auth/", authRouter);


app.use(errorNotFound);
app.use(errorGlobal);

export default app;
//
