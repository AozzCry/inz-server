import { readFileSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

import Image from "../models/imageModel.js";
import Product from "../models/productModel.js";

const __dirname = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

export function saveImage({ body: { productId }, file, user }, res) {
  if (user && user.role !== "admin")
    res.status(401).json({ message: "Not an admin." });
  else if (
    ["image/jpg", "image/png", "image/jpeg"].includes(file.mimetype) &&
    file.size < 12000000
  ) {
    const newImage = new Image({
      productId: productId,
      img: readFileSync(path.join(__dirname + "/" + file.filename)),
    });
    const error = newImage.validateSync();
    if (error) res.status(400).json({ message: error.message });
    else {
      Product.findById(newImage.productId, (error, product) => {
        if (!product) res.status(204).json({ message: "Product not found." });
        else {
          newImage.save();
          res.status(200).json({ message: "Image uploaded." });
        }
      });
    }
  } else {
    res
      .status(400)
      .json({ message: "Only jpg and png images are allowed. Max size 12MB" });
  }
  unlinkSync(__dirname + "/" + file.filename);
}

export async function saveMiniImage({ body: { productId }, file, user }, res) {
  if (user && user.role !== "admin")
    res.status(401).json({ message: "Not an admin." });
  else if (
    ["image/jpg", "image/png", "image/jpeg"].includes(file.mimetype) &&
    file.size < 4000000
  ) {
    const buffer = readFileSync(path.join(__dirname + "/" + file.filename));
    Product.findById(productId, (error, product) => {
      if (!product) res.status(204).json({ message: "Product not found." });
      else {
        product.miniImg = buffer;
        product.save();
        res.status(200).json({ message: "Miniature image uploaded." });
      }
    });
  } else {
    res
      .status(400)
      .json({ message: "Only jpg and png images are allowed. Max size 12MB" });
  }
  unlinkSync(__dirname + "/" + file.filename);
}

export function getProductImages({ query: { productId } }, res) {
  if (typeof productId === "string")
    Image.find({ productId: productId }, (error, images) => {
      let sendableImages = [];
      for (const image of images) {
        sendableImages.push(
          Buffer.from(image.img, "binary").toString("base64")
        );
      }
      res.status(200).send(sendableImages);
    });
  else res.status(400).send({ message: "Product id wrong type or empty." });
}

export function deleteImage({ params: { _id } }, res) {
  if (typeof _id === "string")
    Image.deleteOne({ _id }, (error) => {
      if (error) res.status(400).send({ message: error.message });
      else res.status(200).send({ message: "Image deleted." });
    });
  else res.status(400).send({ message: "Product id wrong type or empty." });
}
