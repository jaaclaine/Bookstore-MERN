import express from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type"],
  })
);

app.get("/", (request, response) => {
  return response.status(234).send("Welcome to MERN stack tutorial");
});

app.use("/books", booksRoute);

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
