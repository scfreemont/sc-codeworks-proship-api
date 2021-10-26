import express from "express";

import { TimeInTransit } from "../controllers/ups.js";
import { Verification } from "../controllers/usps.js";

const router = express.Router();

router.post("/ups", TimeInTransit);
router.post("/usps", Verification);

export default router;
