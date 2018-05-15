const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next){
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto){
      next(null, true);
    }else {
      next({ message: 'That filetype isn\'t allowed'}, false);
    }
  }
};


exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};

exports.addProduct = (req, res) => {
  res.render('editProduct', {title: 'Add Product'});
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  //check if there is no new file to resize
  if (!req.file){
    next(); //skip to the next middleware
    return;
  }
  //console.log(req.file);
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  //now we resize 
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  //once we have written the photo to our filesystem, keep going
  next();  
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

exports.getProductBySlug = async (req, res) => {
  //res.json(req.params);
  const product = await Product.findOne({ slug: req.params.slug });
  //res.json(product)
  if(!product) return next();
  res.render('product', { product, title: product.name });
};

exports.getProductsByTag = async (req, res) => {
  const tags = await Product.getTagsList();
  //res.json(tags); 
  const tag = req.params.tag;

  res.render('tag', { tags, title: 'Tags', tag })
};