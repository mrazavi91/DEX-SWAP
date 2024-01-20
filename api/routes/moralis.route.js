import { Router } from "express";
import { getTokenPrice } from "../controllers/moralis.controller.js";

const moralisRouter = Router()

moralisRouter.get('/tokenprice', getTokenPrice)


export default moralisRouter