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
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  }
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