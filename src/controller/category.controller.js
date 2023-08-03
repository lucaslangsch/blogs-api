const { categoryService } = require('../service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await categoryService.createCategory(name);
  res.status(mapStatusHTTP(status)).json(data);
};

const getCategories = async (req, res) => {
  const { status, data } = await categoryService.getCategories();
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createCategory,
  getCategories,
};