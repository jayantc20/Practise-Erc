import express from "express";
const router = express.Router();
// import {
//   postDecreaseAllowance,
//   postIncreaseAllowance,
//   postTransfer,
//   postTransferFrom,
// } from "../modules/posterctoken.js";
import { postTransfer } from "../modules/posterctoken.js";

router.route("/transfer").post(postTransfer);
// router.route("/decreaseAllowance").post(postDecreaseAllowance);
// router.route("/increaseAllowance").post(postIncreaseAllowance);
// router.route("/transferFrom").post(postTransferFrom);

export default router;
