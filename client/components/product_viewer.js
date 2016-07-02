import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import { Products } from '../../imports/collections/products'

class ProductViewer extends Component {
  render() {
    if (!this.props.product) { return <div>Loading...</div>}
    const { name, image, description, price } = this.props.product
    return (
      <div className="container product-main">
        <div className="row">
          <div className="col-md-7">
            <img src={image} alt=""/>
          </div>
          <div className="col-md-5">
            <h1>{name}</h1>
            <p class="lead">{description}</p>
            <div className="row">
              <div className="col-md-12">
                <h3>{price}</h3>
                <hr/>
                <p>
                  <a href="#" className="btn btn-success" id="add-to-cart">
                    <i className="glyphicon glyphicon-shopping-cart"></i>
                    Add To Cart
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default createContainer((props) => {
  const { productId } = props.params
  Meteor.subscribe('products')
  return { product: Products.findOne(productId) }
}, ProductViewer)
