const Category = require("../model/categoryModel");

let categoryController = async (req, res) => {
  const { name, ownerId } = req.body;
  console.log(name, ownerId);

  let category = new Category({
    name: name,
    ownerId: ownerId,
  });
  category.save();
  console.log(category);
  res.send({ success: "successfully created" });
};

module.exports = categoryController;
