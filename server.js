import express from "express";
const PORT = process.env.PORT || 8080;

import { config } from "dotenv";
import { connectDB } from "./config/database.js";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";

// importing API routes
import user from "./routes/userRoutes.js";
import prediction from "./routes/predictionRoutes.js";

config({
    path: "./config/config.env"
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());

connectDB();

app.use("/api/user", user);
app.use("/api/prediction", prediction);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
    console.log(`Listening to port the port http://localhost:${PORT}`);
});
