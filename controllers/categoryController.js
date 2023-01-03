import Category from "../models/categoryModel.js";

export function getAllCategories(req, res) {
  Category.find({}, function (error, categories) {
    if (error) res.json({ message: "Couldn't get categories: " + error });
    else if (!categories)
      res.status(204).json({ message: "There are no categories." });
    else res.status(200).json(categories);
  });
}
export function createCategory(req, res) {
  const newCategory = new Category(req.body);
  const error = newCategory.validateSync();
  if (error) res.status(400).json({ message: error.message });
  Category.findOne({ name: newCategory.name }, (error, category) => {
    if (error) res.json({ message: "Couldn't create category: " + error });
    else if (category)
      res.status(404).json({ message: "Category already exists." });
    else {
      newCategory.save();
      res.status(201).json({ message: "Category created." });
    }
  });
}
export function deleteCategory({ params: { name } }, res) {
  if (typeof name === "string") {
    Category.findOneAndDelete({ name }, function (error, category) {
      if (!category)
        res.status(404).json({ message: "Category doesn't exists." });
      else res.status(200).json({ message: "Category has been deleted." });
    });
  } else {
    res.status(400).json({ message: "Name is empty of wrong type" });
  }
}
