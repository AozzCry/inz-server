import Product from "../models/productModel.js";

export function getProductById(req, res) {
  //req.get.params
  try {
    Product.findById(req.body.id, (product) => {
      if (!product) {
        res.status(404).json({ message: "Product not found." });
      } else {
        res.status(200).json(product);
      }
    });
  } catch (err) {
    res.json({ message: "Couldn't get product: " + err });
  }
}
export function createProduct(req, res) {
  try {
    Product.create(req.body);
    res.status(201).json({ message: "Product created." });
  } catch (err) {
    res.json({ message: "Couldn't create product: " + err });
  }
}
export function updateProduct(req, res) {
  try {
    Product.findById(req.body.id, (product) => {
      if (!product) {
        res.status(404).json({ message: "Product not found." });
      } else {
        Product.updateOne(req.body);
        res.status(201).json({ message: "Product modified." });
      }
    });
  } catch (err) {
    res.json({ message: "Couldn't modify product: " + err });
  }
}
export function removeProduct(req, res) {
  try {
    Product.remove(req.product);
    res.status(204).json({ message: "Product removed." });
  } catch (error) {
    res.json({ message: "Couldn't remove product: " + err });
  }
}
