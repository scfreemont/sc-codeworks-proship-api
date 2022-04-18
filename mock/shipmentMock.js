// city: 'Dover',
//       state_code: 'OH',
//       postal_code: '44622',
//       country_code: 'US'
//     },
//     to: {
//       city: 'Charlotte',
//       state_code: 'NC',
//       postal_code: '28205',
//       country_code: 'US'
const shipment = {
  shipFrom: {
    name: "Thor",
    address1: "26602 ALISO CREEK ROAD",
    address2: "Cattamanchi",
    address3: "Cattamanchi",
    city: "ROSWELL",
    state: "GA",
    zip: "30076",
    statecode: "OH",
    country: "US",
  },
  shipTo: {
    name: "Iron Man",
    address1: "26602 ALISO CREEK ROAD",
    address2: "Cattamanchi",
    address3: "Cattamanchi",
    city: "New York",
    state: "GA",
    statecode: "NC",
    zip: "30076",
    country: "US",
  },
  billTo: {
    name: "Konda Babu",
    address1: "1-4E",
    address2: "Kothaindlu",
    address3: "Kothaindlu",
    city: "Tirupathi",
    state: "Andhra Pradesh",
    zip: "517152",
    country: "Canada",
  },
  shippingcharge: {
    name: "POSTPAID",
  },
  carrier: {
    name: "UPS",
  },
  packages: [],
};

export default {
  shipment: shipment,
};
