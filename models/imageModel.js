import { Schema, model } from "mongoose";
import { Buffer } from "buffer";
export const imageSchema = new Schema({
  productId: Schema.Types.ObjectId,
  img: Buffer,
});
export default new model("Image", imageSchema);
