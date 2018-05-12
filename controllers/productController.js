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

exports.updateProduct = async (req, res) => {
  //set the location data to be a point
  req.body.location.type = 'Point';
  //1. Find and update the product 
  const product = await Product.findOneAndUpdate({ _id: req.params.id}, req.body, {
    new: true, //return the new product instead of the old one
    runValidators: true
  }).exec();
  req.flash('success', `Succesfully updated <strong>${product.name}</strong>. <a href="/products/${product.slug}">View article →</a>`);
  res.redirect(`/products/${product._id}/edit`);
  //2. Redirect to the product and tell the user it worked
 
};