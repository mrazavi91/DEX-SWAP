import { Router } from "express";
import { performAllowance, performApprove, performSwap } from "../controllers/oneInch.controller.js";

const oneInchRouter = Router()

oneInchRouter.post('/allowance', performAllowance)
oneInchRouter.post('/approve', performApprove)
oneInchRouter.post('/swap' , performSwap)
export default oneInchRouter