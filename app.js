import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./config/db.js";
import userRoutes from "./routers/userRoutes.js";
import clientRouting from "./routers/clientRouters.js";
import shipmentRouting from "./routers/shipmentRouter.js";
import dbRouting from "./routers/shipmentRouter.js";
import Carrier from "./routers/carrierRouter.js";




dotenv.config();

const dbConnection  = connectToMongoDB();

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/client", clientRouting);
app.use("/api/shipment", shipmentRouting);
app.use("/api/rpg", dbRouting);
app.use("/api/ups",Carrier);
app.use("/api/usps",Carrier);


app.get("/", (req, res) => res.send("hello"));


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
