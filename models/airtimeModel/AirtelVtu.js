const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AirtelSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  request_id: {
    type: String,
    required: true,
  },
  serviceID: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("airtels", AirtelSchema);
