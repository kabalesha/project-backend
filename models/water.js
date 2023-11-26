import { Schema, model } from "mongoose";
import Joi from "joi";

const waterSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  amount: {
    type: Number,
    min: 1,
    max: 5000,
    required: [true, "Enter the value of the water used"],
  },
  date: {
    type: Date,
    required: true,
  },
});

export const waterAddSchema = Joi.object({
  amount: Joi.string().required(),
  date: Joi.string().required(),
});

const Water = model("water", waterSchema);

export default Water;
