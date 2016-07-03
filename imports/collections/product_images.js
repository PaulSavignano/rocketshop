import { Mongo } from 'meteor/mongo'
import { FS } from 'meteor/cfs:base-package'

const ProductImages = new FS.Collection('ProductImages', {
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

export default ProductImages
