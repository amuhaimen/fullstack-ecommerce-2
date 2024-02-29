const Category = require("../model/categoryModel");

const allcategoryController = async function (req, res) {
  let data = await Category.find({}).populate("ownerId");
  res.send(data);
};

module.exports = allcategoryController;
