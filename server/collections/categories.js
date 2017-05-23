// create collection from Category table 
const db = require('../config/config');
const Category = require('../models/category');

const Categories = new db.Collection();

Categories.model = Category;

module.exports = Categories;