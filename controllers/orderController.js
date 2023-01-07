import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

export function getSelfOrders({ user }, res) {
  Order.find({ userId: user._id }, (error, orders) => {
    res.status(200).json(orders);
  });
}

export function createOrder({ body }, res) {
  const newOrder = new Order(body);
  const error = newOrder.validateSync();
  if (error) res.status(400).json({ message: error.message });
  else {
    User.findById(newOrder.userId, async (error, user) => {
      if (!user) res.status(404).json({ message: "User not found." });
      else {
        if (
          user.firstname !== newOrder.userInfo.firstname ||
          user.lastname !== newOrder.userInfo.lastname ||
          user.username !== newOrder.userInfo.username ||
          user.username !== newOrder.userInfo.username
        )
          res.status(400).json({ message: "Outdated user information." });
        else {
          let sum = 0;
          let errors = [];
          for (const [i, { productId, count }] of newOrder.products.entries()) {
            await Product.findById(productId)
              .exec()
              .then((product) => {
                if (!product)
                  errors.push(`Product[${i}] with given id doesn't exist.`);
                else if (product.status !== "in stock")
                  errors.push(product.name + " not in stock.");
                else if (product.quantity < count)
                  errors.push(
                    "Not enough " +
                      product.name +
                      " in stock.(available: " +
                      product.quantity +
                      ")"
                  );
                else sum = sum + product.price * count;
              });
          }
          if (errors) res.status(400).json({ message: errors });
          else if (sum < 0.01)
            res.status(400).json({
              message: "Error in finding products.",
            });
          else if (sum.toFixed(2) !== newOrder.sumPrice.toFixed(2))
            res.status(400).json({ message: "Product price outdated." });
          else {
            newOrder.status = "awaiting payment";
            newOrder.save((error) => {
              if (error)
                res.status(400).json({
                  message: "Error saving order: " + error,
                });
              else {
                for (const { productId, count } of newOrder.products) {
                  Product.findById(productId, (error, foundProduct) => {
                    foundProduct.quantity = foundProduct.quantity - count;
                    foundProduct.timesBought = foundProduct.timesBought + count;
                    if (foundProduct.quantity < 1)
                      foundProduct.status = "out of stock";
                    foundProduct.save();
                  });
                }
                res.status(201).json({ message: "Order created." });
              }
            });
          }
        }
      }
    });
  }
}

export function changeOrderStatus({ body: { orderId, status } }, res) {
  if (typeof orderId !== "string" || typeof status !== "string")
    res.status(400).send({ message: "Order Id and status required." });
  else
    Order.findById(orderId, (error, order) => {
      if (!order)
        res.status(404).send({ message: "Order with given id doesn't exist." });
      else {
        order.status = status;
        order.save((error) => {
          error
            ? res
                .status(400)
                .send({ message: "Error changing status: " + error })
            : res
                .status(200)
                .send({ message: "Order status changed to: " + status });
        });
      }
    });
}

export function deleteOrder({ params: { _id } }, res) {
  if (typeof _id !== "string")
    res.status(400).send({ message: "Order Id is required." });
  else
    Order.findByIdAndDelete(_id, (error, order) => {
      if (!order)
        res.status(404).send({ message: "Order with given id doesn't exist." });
      else
        error
          ? res.status(400).send({ message: "Error deleting order: " + error })
          : res.status(200).send({ message: "Order succesfully deleted." });
    });
}
export function getAllOrders(req, res) {
  Order.find((error, orders) => {
    res.status(200).json(orders);
  });
}
