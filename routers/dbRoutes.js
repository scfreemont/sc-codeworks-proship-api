import express from "express";
const router = express.Router();
import {
    dbconnection,

} from "../controllers/db2Controller.js";


router.get("/dbconnect",  dbconnection);



export default router;
