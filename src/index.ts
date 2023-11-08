import "dotenv/config";

import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import express from "express";
import mongoose from "mongoose";
import router from "@/router";

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use("/", router());

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
	console.log(error.message);
});

const server = createServer(app);

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}/.`);
});
