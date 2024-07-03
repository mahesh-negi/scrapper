import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const companySchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  url: {
    type: String,
    default: null,
  },
  logo: {
    type: String,
    default: null,
  },
  facebook: {
    type: String,
    default: null,
  },
  linkedin: {
    type: String,
    default: null,
  },
  twitter: {
    type: String,
    default: null,
  },
  screenShot: {
    type: String,
    default: null,
  },
  instagram: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
});

companySchema.plugin(mongoosePaginate);

const Company = model("Company", companySchema);

export default Company;
