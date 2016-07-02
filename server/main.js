import { Meteor } from 'meteor/meteor';
import { Products } from '../imports/collections/products'
import { ProductImages } from '../imports/collections/products'

Meteor.startup(() => {
  Meteor.publish('products', function() {
    return Products.find({})
  })
  Meteor.publish('productImages', function() {
    return ProductImages.find({})
  })
});
