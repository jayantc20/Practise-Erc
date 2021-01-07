import express from "express";
const router = express.Router();
import {
  getTotalSupply,
  getSymbol,
  getAllowance,
  getBalance,
  getDecimals,
  getName,
} from "../modules/geterctoken.js";

router.route("/balance/:address").get(getBalance);
router.route("/symbol").get(getSymbol);
router.route("/totalSupply").get(getTotalSupply);
router.route("/allowance").get(getAllowance);
router.route("/name").get(getName);
router.route("/decimals").get(getDecimals);

export default router;
