import express from "express";
import prouductRoute from "../routes/productRoutes.js";

const app = express();

//route handler
app.use("/api/products", prouductRoute);

export default app;
