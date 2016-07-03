import { Mongo } from 'meteor/mongo'
import ProductImages from './product_images'

const Products = new Mongo.Collection('products')


Meteor.methods({
  'product.insert': function() {
    return Products.insert({
      sku: '',
      name: '',
      image: 'http://dummyimage.com/600x400',
      summary: '',
      description: '',
      price: '',
      createdAt: new Date(),
      ownerId: this.userId
    })
  },
  'product.update.name': function(productId, name) {
    return Products.update(productId, { $set: { name } })
  },
  'product.update.description': function(productId, description) {
    return Products.update(productId, { $set: { description } })
  },
  'product.update.price': function(productId, price) {
    return Products.update(productId, { $set: { price } })
  },
  'product.remove': function(productId) {
    return Products.remove(productId)
  },
  'product.update.image': function(productId, result) {
    const imageLoc = `/cfs/files/ProductImages/${result}`
    Products.update(productId, { $set: { image: imageLoc } })
  }
})



Products.bySku = function(sku){
  return Products.findOne({sku : sku});
};

Products.featured = function(){
  var featuredSkus = ["honeymoon-mars","johnny-liftoff","one-way-reentry"];
  return Products.find({sku : {$in : featuredSkus}},
    {fields : {inventory : false, cost : false}});
};

Products.allow({
  update : function(userid, product){
    return isAdmin();
  },
  insert : function(userid, product){
    return isAdmin();
  },
  remove : function(userid, product){
    return isAdmin();
  }
});


export default Products
