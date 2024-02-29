const SubCategory = require("../model/subCategorySchema");

const deleteSubCategoryController = async function (req, res) {
  let { id } = req.body;

  await SubCategory.findByIdAndDelete({ _id: id });
  res.send({ success: "Category deleted successfully" });
};

module.exports = deleteSubCategoryController;
