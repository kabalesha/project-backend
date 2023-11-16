import { Schema, model } from "mongoose";
import Joi from "joi";

const waterSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amount: {
    type: String,
    required: [true, "Set amount of water"],
  },
  date: {
    type: String,
    required: true,
  },
});

export const waterAddSchema = Joi.object({
  amount: Joi.string().required().messages({
    "any.required": `"amount" must be exist`,
  }),
  date: Joi.string().required(),
});

const Water = model("water", waterSchema);

export default Water;
