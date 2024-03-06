const Category = require("../model/categoryModel");

let approvecategoryController = async (req, res) => {
  const { isActive, id } = req.body;
  await Category.findByIdAndUpdate({ _id: id }, { isActive: isActive });
  res.send({ success: "status changed" });
};

module.exports = approvecategoryController;
