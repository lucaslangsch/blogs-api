const { Category } = require('../models');

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return { status: 'CREATED', data: newCategory };
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  createCategory,
  getCategories,
};