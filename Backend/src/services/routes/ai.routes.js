import express from "express"
import { aiReviewGet } from "../controller/ai.controller.js";

const router = express.Router();

router.post("/get-review", aiReviewGet)


export default router