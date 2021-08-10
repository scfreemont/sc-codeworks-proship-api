import express from "express";
import asyncHandler from "express-async-handler";
import shipmentData from "../mock/shipmentMock.js";

const router = express.Router();


router.post("/:shipmentId", asyncHandler(async (req, res) => {
    console.log(`Request is routing to ${JSON.stringify(req.params.shipmentId)}`)   
    res.send({data : shipmentData.shipment});
}));


export default router;
