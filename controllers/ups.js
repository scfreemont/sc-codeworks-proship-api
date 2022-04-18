import upsAPI from "ups-nodejs-sdk";
import asyncHandler from "express-async-handler";
import fs from "fs";
import util from "util";
import fetch from "node-fetch";
import axios from "axios";

const TimeInTransit = asyncHandler(async (req, res) => {
  const packagess = req.body;
  //   const ShipFrom = packages?.packages?.data?.shipFrom;
  //   const ShipTo = packages?.packages?.data?.shipTo;
  //   const Address = packages?.packages?.data?.packages;
  const { shipFrom, shipTo, billTo, packages } = packagess.InputData.data;

  const PackageInfo = packages[0];

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
            AddressLine: `${shipFrom.address1}`,
            City: `${shipFrom.city}`,
            StateProvinceCode: `${shipFrom.state}`,
            PostalCode: `${shipFrom.zip}`,
            CountryCode: `${shipFrom.country}`,
          },
        },
        ShipTo: {
          Name: `${shipTo.name}`,
          AttentionName: "Viswachand",
          Phone: {
            Number: "1234567890",
          },
          FaxNumber: "1234567999",
          TaxIdentificationNumber: "456999",
          Address: {
            AddressLine: `${shipFrom.address1}`,
            City: `${shipFrom.city}`,
            StateProvinceCode: `${shipFrom.state}`,
            PostalCode: `${shipFrom.zip}`,
            CountryCode: `${shipFrom.country}`,
          },
        },
        ShipFrom: {
          Name: `${shipFrom.name}`,
          AttentionName: "AttentionName",
          Phone: {
            Number: "1234567890",
          },
          FaxNumber: "1234567999",
          TaxIdentificationNumber: "456999",
          Address: {
            AddressLine: `${shipFrom.address1}`,
            City: `${shipFrom.city}`,
            StateProvinceCode: `${shipFrom.state}`,
            PostalCode: `${shipFrom.zip}`,
            CountryCode: `${shipFrom.country}`,
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
              Weight: `${PackageInfo.w}`,
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
              Weight: `${PackageInfo.w}`,
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

      //   var buf = Buffer.from(graphicImage, "base64");

      console.log(graphicImage);
    })
    .catch((error) => {
      console.log(error);
    });
});

export { TimeInTransit };
