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
  res.render('products', { title: 'Articles', products });
};

exports.editProduct = async (req, res) => {
  //1. Find the product given the id 
  const product = await Product.findOne({ _id: req.params.id });
  //2. Confirm the user is the seller
  //TODO
  //3. Render out the edit form so the user can update their product
  res.render('editProduct', { title: `Edit ${product.name}`, product });

};