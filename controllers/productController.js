import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import Question from "../models/questionModel.js";
import Image from "../models/imageModel.js";

export function findProducts({ query: { name, category } }, res) {
  if (typeof name === "string" || typeof category === "string") {
    if (category && name) {
      Product.find(
        {
          categories: { $in: category.split(",") },
          $text: { $search: name },
        },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .exec((error, products) => {
          if (!products)
            res.status(204).json({ message: "No products found." });
          else res.status(201).json(products);
        });
    } else if (name) {
      Product.find(
        { $text: { $search: name } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .exec((error, products) => {
          if (!products)
            res.status(204).json({ message: "No products found." });
          else res.status(201).json(products);
        });
    } else {
      Product.find(
        { categories: { $in: category.split(",") } },
        (error, products) => {
          if (!products)
            res.status(204).json({ message: "No products found." });
          else res.status(201).json(products);
        }
      );
    }
  } else
    res.status(400).json({ message: "Product name or category is required." });
}

export function getProductByLink({ params: { nameLink }, user }, res) {
  if (typeof nameLink === "string") {
    Product.findOne(
      { nameLink: encodeURIComponent(nameLink) },
      (error, product) => {
        if (error)
          res.status(400).json({ message: "Couldn't get product: " + error });
        if (!product) res.status(204).json({ message: "Product not found." });
        else {
          Review.find({ productId: product._id }, (error, reviews) => {
            Question.find({ productId: product._id }, (error, questions) => {
              if (user) {
                if (
                  user.lastSeenProducts.length === 0 ||
                  !user.lastSeenProducts.some(
                    (p) => p === product._id.toString()
                  )
                ) {
                  user.lastSeenProducts.unshift(product._id.toString());
                  if (user.lastSeenProducts.length > 5)
                    user.lastSeenProducts.pop();
                  user.save();
                }
              }
              Image.find(
                { productId: product._id },
                async (error, binImages) => {
                  let images = [];
                  for await (const binImage of binImages) {
                    images.push({
                      imageId: binImage._id,
                      base64: Buffer.from(binImage.img, "binary").toString(
                        "base64"
                      ),
                    });
                  }
                  res.status(200).json({ product, reviews, questions, images });
                }
              );
            });
          });
        }
      }
    );
  } else res.status(400).json({ message: "Product id required." });
}
export function getHomeProducts({ user }, res) {
  Product.find()
    .sort({ _id: -1 })
    .limit(5)
    .exec((error, randomProducts) => {
      if (user) {
        Product.find(
          { _id: { $in: user.lastSeenProducts } },
          (error, userProduct) => {
            res.status(200).json({
              lastSeenProducts: userProduct,
              randomFiveProducts: randomProducts,
            });
          }
        );
      } else {
        res.status(200).json({ randomFiveProducts: randomProducts });
      }
    });
}
export function getCartProducts({ query }, res) {
  Product.find({ categories: { $in: query.category.split(",") } })
    .limit(5)
    .exec((error, products) => {
      res.status(201).json(products);
    });
}
export function addOrUpdateProduct({ body }, res) {
  const newProduct = new Product(body.product);
  const error = newProduct.validateSync();
  if (error) res.status(400).json({ message: error.message });
  else
    Product.findOne({ name: newProduct.name }, (error, product) => {
      if (product && !product._id.equals(body._id))
        res
          .status(404)
          .json({ message: "Product with this name alredy exists." });
      else {
        if (body._id) {
          Product.findByIdAndUpdate(
            body._id,
            body.product,
            (error, product) => {
              if (!product)
                res.status(404).json({ message: "Product doesn't exists." });
              else {
                product.save();
                res.status(200).json({ message: "Product updated." });
              }
            }
          );
        } else {
          newProduct.save();
          res.status(201).json({ message: "Product created." });
        }
      }
    });
}
export function deleteProduct({ params: { _id } }, res) {
  if (typeof _id === "string") {
    Product.findOneAndDelete({ _id }, function (error, product) {
      if (!product)
        res.status(404).json({ message: "Product doesn't exists." });
      else {
        Image.deleteMany({ productId: _id }, () => {
          Question.deleteMany({ productId: _id }, () => {
            Review.deleteMany({ productId: _id }, () => {
              res.status(200).json({ message: "Product deleted." });
            });
          });
        });
      }
    });
  } else {
    res.status(400).json({ error: "Product id is empty of wrong type." });
  }
}
