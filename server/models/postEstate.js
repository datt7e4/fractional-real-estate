import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  creator: String,
  name: String,
  title: String,
  address: String,
  description: String,
  beds: String,
  baths: String,
  area: String,
  year_built: String,
  property_type: String,
  selectedFile_coverPhoto: String,
  selectedFile_photos: [String],
  annual_gross_rents: Number,
  rate_of_return: Number,
  initial_property_price: Number,
  initial_property_share: Number,
  expenses: Number,
  other_expenses: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostEstate = mongoose.model("PostEstate", postSchema);
export default PostEstate;
