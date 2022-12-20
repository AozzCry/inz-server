import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import Question from "../models/questionModel.js";
import Image from "../models/imageModel.js";

export function findProducts({ query }, res) {
  if (
    typeof query.name === "string" ||
    typeof query.category === "string" ||
    typeof query.limit === "number"
  ) {
    if (query.category && query.name) {
      Product.find(
        {
          categories: { $all: query.category.split(",") },
          $text: { $search: query.name },
        },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .exec((error, products) => {
          if (!products)
            res.status(204).json({ message: "No products found." });
          else res.status(201).json(products);
        });
    } else if (query.name) {
      Product.find(
        {
          $text: { $search: query.name },
        },
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
        { categories: { $all: query.category.split(",") } },
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

export function getProductById({ params: { nameLink }, user }, res) {
  if (typeof nameLink === "string") {
    Product.findOne({ nameLink: nameLink }, (error, product) => {
      if (error)
        res.status(400).json({ message: "Couldn't get product: " + error });
      if (!product) res.status(204).json({ message: "Product not found." });
      else {
        Review.find({ productId: product._id }, (error, reviews) => {
          Question.find({ productId: product._id }, (error, questions) => {
            if (user) {
              if (
                user.lastSeenProducts.length === 0 ||
                !user.lastSeenProducts.some((p) => p === product._id.toString())
              ) {
                user.lastSeenProducts.unshift(product._id.toString());
                if (user.lastSeenProducts.length > 5)
                  user.lastSeenProducts.pop();
                user.save();
              }
            }
            Image.find({ productId: product._id }, async (error, binImages) => {
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
            });
          });
        });
      }
    });
  } else res.status(400).json({ message: "Product id required." });
}
export function getHomeProducts({ user }, res) {
  Product.count((error, count) => {
    Product.find()
      .skip(Math.floor(Math.random() * (count - 5)))
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
  });
}
export function createProduct({ body }, res) {
  const newProduct = new Product(body);
  newProduct.nameLink =
    encodeURIComponent(newProduct.name.replaceAll(/[^\w]/g, "-")) +
    newProduct._id;
  const error = newProduct.validateSync();
  if (error) res.status(400).json({ message: error.message });
  else {
    Product.findOne({ name: newProduct.name }, (error, product) => {
      if (error)
        res.status(400).json({ message: "Couldn't get product: " + error });
      else if (product)
        res
          .status(404)
          .json({ message: "Product with this name alredy exists." });
      else {
        newProduct.save();
        res.status(201).json({ message: "Product created." });
      }
    });
  }
}

export function updateProduct({ body }, res) {
  Product.findById(body._id, (error, product) => {
    if (error) res.json({ message: "Couldn't get product: " + err });
    if (!product) res.status(400).json({ message: "Can't find product." });
    else {
      const modifiedProduct = new Product(...product, body);
      const error = modifiedProduct.validateSync();
      if (error) res.status(400).json({ message: error.message });
      else {
        Product.find(modifiedProduct.name, (error, existingProduct) => {
          if (error) res.json({ message: "Couldn't get product: " + err });
          if (existingProduct)
            res
              .status(400)
              .json({ message: "Product with this name alredy exists." });
          else {
            modifiedProduct.save();
            res.status(201).json({ message: "Product created." });
          }
        });
      }
    }
  });
}
export function deleteProduct({ body: { productId } }, res) {
  if (typeof productId === "string") {
    Product.findOneAndDelete({ _id: productId }, function (error, product) {
      if (!product)
        res.status(404).json({ message: "Product doesn't exists." });
      else {
        Image.deleteMany({ productId: productId }, () => {
          Question.deleteMany({ productId: productId }, () => {
            Review.deleteMany({ productId: productId }, () => {
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
