import express from "express";
import companyController from "../controller/company-controller.js";
const router = express.Router();

router.post("/addCompanyDetails", companyController.addCompanyDetails);

router.get("/getAllCompanies", companyController.getAllCompanyDetails);

router.get("/getCompany", companyController.getCompany);

router.post("/deleteRecords", companyController.deleteRecords);

router.post("/downloadRecords", companyController.downloadRecords);

export default router;
