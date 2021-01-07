import getercRoutes from "./routes/getercRoutes.js";
import postercRoutes from "./routes/postercRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import { config } from "dotenv";
import express from "express";

config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


//support parsing of application/json type post data
app.use(express.json());

app.use("/api/get", getercRoutes);
app.use("/api/post", postercRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
