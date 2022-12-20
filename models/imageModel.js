import { Schema, model, ObjectId } from "mongoose";
export const imageSchema = new Schema({
  productId: ObjectId,
  img: Buffer,
});
export default new model("Image", imageSchema);
