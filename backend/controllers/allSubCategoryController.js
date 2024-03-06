const SubCategory = require("../model/subCategorySchema");

const allSubcategoryController = async (req, res) => {
  let data = await SubCategory.find({}).populate("categoryId");
  res.send(data);
};

module.exports = allSubcategoryController;
