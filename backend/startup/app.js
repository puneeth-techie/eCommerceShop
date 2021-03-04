import express from "express";
import { notFound, errorStack } from "../middleware/errorHandler.js";
import prouductRoute from "../routes/productRoutes.js";
import userRoute from "../routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route handler
app.use("/api/products", prouductRoute);
app.use("/api/users", userRoute);

//Not found URL
app.use(notFound);

//error middleware
app.use(errorStack);

export default app;
