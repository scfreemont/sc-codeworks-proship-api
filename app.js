import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./config/db.js";
import userRoutes from "./routers/userRoutes.js";
import clientRouting from "./routers/clientRouters.js";
import shipmentRouting from "./routers/shipmentRouter.js";
import dbRouting from "./routers/shipmentRouter.js";
import Carrier from "./routers/carrierRouter.js";
import fetch from "node-fetch";
import axios from "axios";
import Jimp from "jimp";
import fs from "fs";

dotenv.config();

// const dbConnection  = connectToMongoDB();

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/client", clientRouting);
app.use("/api/shipment", shipmentRouting);
app.use("/api/rpg", dbRouting);
app.use("/api/ups", Carrier);
app.use("/api/usps", Carrier);

// app.get("/", (req, res) => res.send("hello"));

const UPS_url = "https://wwwcie.ups.com/ship/v1/shipments";
const dataString = {
  ShipmentRequest: {
    Shipment: {
      Description: "1206 PTR",
      Shipper: {
        Name: "Viswachand",
        AttentionName: "Vineeth",
        TaxIdentificationNumber: "TaxID",
        Phone: {
          Number: "1234567890",
        },
        ShipperNumber: "92796A",
        Address: {
          AddressLine: "26602 ALISO CREEK ROAD",
          City: "New York",
          StateProvinceCode: "GA",
          PostalCode: "30076",
          CountryCode: "US",
        },
      },
      ShipTo: {
        Name: "ShipToName",
        AttentionName: "Viswachand",
        Phone: {
          Number: "1234567890",
        },
        FaxNumber: "1234567999",
        TaxIdentificationNumber: "456999",
        Address: {
          AddressLine: "26601 ALISO CREEK ROAD",
          City: "New York",
          StateProvinceCode: "GA",
          PostalCode: "30076",
          CountryCode: "US",
        },
      },
      ShipFrom: {
        Name: "Vineeth",
        AttentionName: "AttentionName",
        Phone: {
          Number: "1234567890",
        },
        FaxNumber: "1234567999",
        TaxIdentificationNumber: "456999",
        Address: {
          AddressLine: "26602 ALISO CREEK ROAD",
          City: "ROSWELL",
          StateProvinceCode: "GA",
          PostalCode: "30076",
          CountryCode: "US",
        },
      },
      PaymentInformation: {
        ShipmentCharge: {
          Type: "01",
          BillShipper: {
            AccountNumber: "92796A",
          },
        },
      },
      Service: {
        Code: "01",
        Description: "Expedited",
      },
      Package: [
        {
          Description: "International Goods",
          Packaging: {
            Code: "02",
          },
          PackageWeight: {
            UnitOfMeasurement: {
              Code: "LBS",
            },
            Weight: "10",
          },
          PackageServiceOptions: "",
        },
        {
          Description: "International Goods",
          Packaging: {
            Code: "02",
          },
          PackageWeight: {
            UnitOfMeasurement: {
              Code: "LBS",
            },
            Weight: "20",
          },
          PackageServiceOptions: "",
        },
      ],
      ItemizedChargesRequestedIndicator: "",
      RatingMethodRequestedIndicator: "",
      TaxInformationIndicator: "",
      ShipmentRatingOptions: {
        NegotiatedRatesIndicator: "",
      },
    },
    LabelSpecification: {
      LabelImageFormat: {
        Code: "GIF",
      },
    },
  },
};

app.get("/", (req, res) => {
  let headers = {
    AccessLicenseNumber: "8DB4EFB71AF1B845",
    Username: "chroops",
    Password: "TestTest@143",
    "Content-Type": "application/json",
    Accept: "application/json",
    transactionSrc: "transaction123",
    transId: "trans",
  };
  const postBody = JSON.stringify(dataString);
  axios
    .post(UPS_url, postBody, {
      headers: headers,
    })
    .then((response) => {
      const [data] =
        response.data?.ShipmentResponse?.ShipmentResults?.PackageResults;
      const { ShippingLabel } = data;

      const graphicImage = ShippingLabel.GraphicImage;

      var buf = Buffer.from(graphicImage, "base64");
      fs.writeFileSync("demoImg.png", buf);

      res.send(buf);
    })
    .catch((error) => {
      console.log(error);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
