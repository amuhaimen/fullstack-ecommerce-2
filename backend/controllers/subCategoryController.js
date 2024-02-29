const SubCategory = require("../model/subCategorySchema");

let subCategoryController = async (req, res) => {
  const { name, categoryId } = req.body;

  let subCategory = new SubCategory({
    name: name,
    categoryId: categoryId,
  });

  subCategory.save();
  console.log(subCategory);
  res.send({ success: "sub category data created" });
};

module.exports = subCategoryController;
