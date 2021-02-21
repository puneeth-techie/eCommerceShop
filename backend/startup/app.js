import express from "express";
import { notFound, errorStack } from "../middleware/errorHandler.js";
import prouductRoute from "../routes/productRoutes.js";

const app = express();

//route handler
app.use("/api/products", prouductRoute);

//Not found URL
app.use(notFound);

//error middleware
app.use(errorStack);

export default app;
