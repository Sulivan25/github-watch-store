import mongoose from "mongoose";

const watchSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

export const Watch = mongoose.model("Cat", watchSchema);
