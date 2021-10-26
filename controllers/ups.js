import upsAPI from "ups-nodejs-sdk";
import asyncHandler from "express-async-handler";
import fs from "fs";
import util from "util";

const TimeInTransit = asyncHandler(async (req, res) => {
  const { InputData } = req.body;

  console.log(InputData);

  const ups = new upsAPI({
    environment: "sandbox", // or live
    access_key: "CD9EABF4210A1C52",
    username: "SCCodeworks",
    password: "6388Fiesta!",
  });
  ups.time_in_transit(
    {
      from: {
        name: InputData.shipFrom.name,
        city: InputData.shipFrom.city,
        state_code: InputData.shipFrom.state,
        postal_code: InputData.shipFrom.zip,
        country_code: "US",
      },
      to: {
        name: InputData.shipTo.name,
        city: InputData.shipTo.city,
        state_code: InputData.shipTo.state,
        postal_code: InputData.shipTo.zip,
        country_code: "US",
      },
      weight: 10, // set imperial to false for KGS
      // pickup_date: '2021-10-27',
      total_packages: 1, // number of packages in shipment
      value: 999999999.99, // Invoice value, set currency in options
    },
    function (err, res) {
      if (err) {
        console.log(err);
      }

      console.log(util.inspect(res, { depth: null }));
    }
  );
});

export { TimeInTransit };
