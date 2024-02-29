const Category = require("../model/categoryModel");

let editCategoryController = async (req, res) => {
  const { name, id } = req.body;
  await Category.findByIdAndUpdate({ _id: id }, { name: name });
  res.send({ success: "successfully edited" });
};

module.exports = editCategoryController;
