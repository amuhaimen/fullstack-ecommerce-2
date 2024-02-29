const Category = require("../model/categoryModel");

const deleteCategoryController = async function (req, res) {
  let { id } = req.body;

  await Category.findByIdAndDelete({ _id: id });
  res.send({ success: "Category deleted successfully" });
};

module.exports = deleteCategoryController;
