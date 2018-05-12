const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const productSchema = new mongoose.Schema({
  name: {
    type: String, 
    trim: true,
    required: 'Please enter a product name!'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: 'Please enter the price as a number'
  },
  tags: [String]
});

productSchema.pre('save', function name(next) {
  if(!this.isModified('name')){
    next(); //skip it
    return; //stop this function from running
  }
  this.slug = slug(this.name); 
  next();
  //TODO make more resilient so slugs are unique
});
module.exports = mongoose.model('Product', productSchema);