import { Router } from "express";

const router = Router();

import companyRouter from "./company-routes.js";

router.use("/company", companyRouter);

export default router;
