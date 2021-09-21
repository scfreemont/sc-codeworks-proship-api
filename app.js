import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./config/db.js";
import userRoutes from "./routers/userRoutes.js";
import clientRouting from "./routers/clientRouters.js";
import shipmentRouting from "./routers/shipmentRouter.js";
import dbRouting from "./routers/shipmentRouter.js";



dotenv.config();

const dbConnection  = connectToMongoDB();

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/client", clientRouting);
app.use("/api/shipment", shipmentRouting);
app.use("/api/rpg", dbRouting);


app.get("/", (req, res) => res.send("hello"));

app.get("/pgmtest", (req, res) => {
  const xt = require("itoolkit");
  var conn = new xt.iConn("*LOCAL");
  let userID = "vreddy"; // req.body.userID;
  let password = "vk58gaw"; // req.body.password;

  if (!conn) {
    console.error("Connection Failed!");
  } else {
    // call IBM API
    var pgm = new xt.iPgm("TESTNODE", { lib: "NKOHAN", error: "on" });
      pgm.addParam("", "200A");
      pgm.addParam("", "200A");

    conn.add(pgm.toXML());

    conn.run(function (rsp) {
      let results = xt.xmlToJson(rsp);

      res.send(results)
      
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
