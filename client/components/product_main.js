import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import Products from '../../imports/collections/products'
import ProductImages from '../../imports/collections/product_images'
import ProductEditor from './product_editor'

class ProductMain extends Component {
  render() {
    if (!this.props.product) { return <div>Loading...</div> }
    return (
      <div>
        <ProductEditor product={this.props.product} />
      </div>
    )
  }
}

export default createContainer((props) => {
  const { productId } = props.params
  Meteor.subscribe('products')
  Meteor.subscribe('productImages')
  return { product: Products.findOne(productId) }
}, ProductMain)
