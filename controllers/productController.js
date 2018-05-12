const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};

exports.addProduct = (req, res) => {
  res.render('editProduct', {title: 'Add Product'});
};

exports.createProduct = async (req, res) => {
  //res.json(req.body);
  const product = new Product(req.body);
  await product.save();
  res.redirect('/');
};