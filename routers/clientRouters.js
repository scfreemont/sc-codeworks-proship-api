import express from "express";
import asyncHandler from "express-async-handler";
import connectToMongoDB from "../config/db.js";

const router = express.Router();


router.post("/:clientId", asyncHandler(async (req, res) => {
    console.log(`Request is routing to ${JSON.stringify(req.params.clientId)}`)
    
    const connection = connectToMongoDB(req.params.clientId);
      
    res.send({clientId: req.params.clientId});
}));


export default router;
