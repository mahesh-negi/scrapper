import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url : {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

companySchema.plugin(mongoosePaginate);

const Company = model("Company", companySchema);

export default Company;
