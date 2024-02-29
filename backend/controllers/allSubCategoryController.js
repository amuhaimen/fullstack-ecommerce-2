const SubCategory = require("../model/subCategorySchema");

const allSubcategoryController = async function (req, res) {
  let data = await SubCategory.find({}).populate("ownerId");
  res.send(data);
};

module.exports = allSubcategoryController;
