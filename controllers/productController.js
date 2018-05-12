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
  const product = await (new Product(req.body)).save();
  req.flash('success', `Successfully Added ${product.name}`);
  res.redirect(`/product/${product.slug}`);
};

exports.getProducts = async (req, res) => {
  //1. Query the database for the articles.
  const products = await Product.find();
  console.log(products);
  res.render('products', { title: 'Articles', products });
};