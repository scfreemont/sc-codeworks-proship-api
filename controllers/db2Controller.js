import asyncHandler from "express-async-handler";

const dbconnection = asyncHandler(async (req, res) => {
  const xt = require("itoolkit");
  var conn = new xt.iConn("*LOCAL");
  

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

      res.send(results);
    });
  }
});

export { dbconnection };
