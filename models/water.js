import { Schema, model } from "mongoose";

const waterSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Water = model("water", waterSchema);

export default Water;
