import {
  responseHandler,
  requestHandler,
} from "../../src/utils/settings/index.js";
import Joi from "joi";
import Company from "../models/company-model.js";
import { RESPONSE } from "../constant/responseMessage.js";
import Boom from "boom";
import { scrapeServices } from "../utils/service/index.js";
import { parse, Parser } from "json2csv";
export default {
  addCompanyDetails: async (req, res) => {
    try {
      const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      const schema = Joi.object({
        url: Joi.string().pattern(urlRegex).required(),
      });

      await requestHandler.validateRequest(req.body, schema);

      const websiteData = await scrapeServices(req.body.url);
      const result = new Company(websiteData);
      await result.save();

      return responseHandler.handleSuccess(res, {
        statusCode: 200,
        message: RESPONSE.COMPANY_DETAILS_ADDED_SUCCESSFULLY,
        member: result,
      });
    } catch (error) {
      return responseHandler.handleError(res, error);
    }
  },
  getAllCompanyDetails: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
      };

      const companies = await Company.paginate(
        {
          isDeleted: false,
        },
        options
      );

      return responseHandler.handleSuccess(res, {
        statusCode: 200,
        message: RESPONSE.ALL_COMPANY_DETAILS,
        member: companies,
      });
    } catch (error) {
      return responseHandler.handleError(res, error);
    }
  },

  getCompany: async (req, res) => {
    try {
      const schema = Joi.object({
        companyId: Joi.string().required(),
      });

      await requestHandler.validateRequest(req.query, schema);

      const { companyId } = req.query;

      const company = await Company.findOne({
        _id: companyId,
        isDeleted: false,
      });

      if (!company) {
        return responseHandler.handleSuccess(res, {
          statusCode: 404,
          message: "Company not found or has been deleted.",
        });
      }

      return responseHandler.handleSuccess(res, {
        statusCode: 200,
        message: RESPONSE.ALL_COMPANY_DETAILS,
        member: company,
      });
    } catch (error) {
      return responseHandler.handleError(res, error);
    }
  },

  deleteRecords: async (req, res) => {
    try {
      const schema = Joi.object({
        companyIds: Joi.array().items(Joi.string()),
      });

      await requestHandler.validateRequest(req.body, schema);

      const companyIds = req.body.companyIds;

      const companies = await Company.updateMany(
        { _id: { $in: companyIds } },
        { $set: { isDeleted: true } }
      );

      if (companies.nModified > 0) {
        return responseHandler.handleSuccess(res, {
          statusCode: 200,
          message: RESPONSE.ALL_COMPANY_DETAILS,
          member: companies,
        });
      } else {
        return responseHandler.handleSuccess(res, {
          statusCode: 404,
          message: "No companies found with the provided IDs.",
          member: companies,
        });
      }
    } catch (error) {
      return responseHandler.handleError(res, error);
    }
  },

  downloadRecords: async (req, res) => {
    try {
      const allRecords = await Company.find({ isDeleted: false });

      if (allRecords.length === 0) {
        return responseHandler.handleSuccess(res, {
          statusCode: 404,
          message: "No records found.",
        });
      }

      const fields = [
        "name",
        "description",
        "url",
        "logo",
        "facebook",
        "linkedin",
        "twitter",
        "instagram",
        "address",
        "phone",
        "email",
      ];

      const opts = { fields };
      const csvData = parse(allRecords, opts);

      const csvFileName = "company_records.csv";
      res.attachment(csvFileName);
      res.send(csvData);
    } catch (error) {
      return responseHandler.handleError(res, error);
    }
  },
};
