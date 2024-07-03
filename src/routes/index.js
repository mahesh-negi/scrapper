import { Router } from "express";

const router = Router();

import companyRouter from "./company-routes.js";

router.use("/user", companyRouter);

export default router;
