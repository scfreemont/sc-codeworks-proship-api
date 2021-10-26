import USPS from "usps-webtools";
import asyncHandler from "express-async-handler";


const Verification = asyncHandler(async (req, res) => {
  const usps = new USPS({
    server: "http://production.shippingapis.com/ShippingAPI.dll",
    userId: "311STONE3897",
    ttl: 10000, //TTL in milliseconds for request
  });

  usps.verify(
    {
      street1: "322 3rd st.",
      street2: "Apt 2",
      city: "San Francisco", 
      state: "CA",
      zip: "94103",
    },
    (err, address) => {
      res.send(address);
    }
  );

    usps.zipCodeLookup({
      street1: '322 3rd st.',
      street2: 'Apt 2',
      city: 'San Francisco',
      state: 'CA'
    }, function(err, address) {
      console.log(address);
    });

  usps.cityStateLookup("43004", function (err, result) {
    // result == { city: , state: , zip: }
    console.log(result);
  });
});

export { Verification };
