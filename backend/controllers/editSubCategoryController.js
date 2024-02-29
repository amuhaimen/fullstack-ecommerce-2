const SubCategory = require("../model/subCategorySchema");

let editSubCategoryController = async (req, res) => {
  const { name, id } = req.body;
  await SubCategory.findByIdAndUpdate({ _id: id }, { name: name });
  res.send({ success: "successfully edited" });
};

module.exports = editSubCategoryController;
