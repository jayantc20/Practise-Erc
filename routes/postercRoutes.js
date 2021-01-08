import express from "express";
const router = express.Router();
// import {
//   postDecreaseAllowance,
//   postIncreaseAllowance,
//   postTransfer,
//   postTransferFrom,
//   postApprove,
// } from "../modules/posterctoken.js";

import {
  postApprove,
  postDecreaseAllowance,
  postIncreaseAllowance,
  postTransfer,
  postTransferFrom,
} from "../modules/posterctoken.js";

router.route("/transfer").post(postTransfer);
router.route("/decreaseAllowance").post(postDecreaseAllowance);
router.route("/increaseAllowance").post(postIncreaseAllowance);
router.route("/transferFrom").post(postTransferFrom);
router.route("/transferFrom").post(postApprove);

export default router;
