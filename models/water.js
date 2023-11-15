import { Schema, model } from "mongoose";

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

const Water = model("water", waterSchema);

export default Water;
