import { Schema, model } from "mongoose";

const waterProfileSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  dailyNorma: {
    type: String,
    default: "2L",
  },
});

const WaterProfile = model("waterProfile", waterProfileSchema);

export default WaterProfile;
