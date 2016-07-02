import { Mongo } from 'meteor/mongo'
import { FS } from 'meteor/cfs:base-package'

export const ProductImages = new FS.Collection('ProductImages', {
  stores: [new FS.Store.GridFS('ProductImages')]
})

ProductImages.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fields, modifier) {
    return true;
  },
  download: function() {
    return true;
  }
});


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
  'product.update': function(productId, name, description, price) {
    return Products.update(productId, { $set: { name, description, price } })
  },
  'product.remove': function(productId) {
    return Products.remove(productId)
  },
  'product.updateImage': function(productId, result) {
    const imageLoc = `/cfs/files/ProductImages/${result}`
    Products.update(productId, { $set: { image: imageLoc } })
  }
})

export const Products = new Mongo.Collection('products')
