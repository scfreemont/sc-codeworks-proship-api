const express = require("express");
const axios = require("axios");
const { parse, stringify, toJSON, fromJSON } = require("flatted");
const app = express();
const port = 3000;

const UPS_url =
  "https://wwwcie.ups.com/addressvalidation/v1/1?regionalrequestindicator=true&maximumcandidatelistsize=10";
const dataString = {
  XAVRequest: {
    AddressKeyFormat: {
      ConsigneeName: "RITZ CAMERA CENTERS-1749",
      BuildingName: "Innoplex",
      AddressLine: [
        "26601 ALISO CREEK ROAD",
        "STE D",
        "ALISO VIEJO TOWN CENTER",
      ],
      Region: "ROSWELL,GA,30076-1521",
      PoliticalDivision2: "ALISO VIEJO",
      PoliticalDivision1: "CA",
      PostcodePrimaryLow: "92656",
      PostcodeExtendedLow: "1521",
      Urbanization: "porto arundal",
      CountryCode: "US",
    },
  },
};
// const dataString={
//     "XAVRequest": {
//         "AddressKeyFormat": {
//             "ConsigneeName": "",
//             "BuildingName": "",
//             "AddressLine": [
//                 "26601 ALISO CREEK ROAD",
//                 "STE D"
//             ],
//             "Region": "ROSWELL,GA,30076",
//             "PoliticalDivision1": "CA",
//             "CountryCode": "US"
//         }
//     }
// }
app.get("/", (req, res) => {
  let headers = {
    AccessLicenseNumber: "XXXXXXXXXXXXXX",
    Username: "XXXXXXXXXXXXXX",
    Password: "XXXXXXXXXXXXXX",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  postBody = JSON.stringify(dataString);
  axios
    .post(UPS_url, postBody, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data);
      console.log(
        response.data.XAVResponse.Response.ResponseStatus.Description
      );
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
