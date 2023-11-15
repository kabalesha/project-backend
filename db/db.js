import mongoose from "mongoose";

const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection!"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
