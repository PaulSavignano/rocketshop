import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Link } from 'react-router'

import { Products } from '../../imports/collections/products'

class ProductsList extends Component {
  renderList() {
    return this.props.products.map((product) => {
      const { name, image, price } = product
      const url = `editproduct/${product._id}`
      return (
        <div key={product._id} className="col-sm-4">
          <div className="col-item">
            <div className="photo">
              <img src={image} className="img-responsive" alt="a" />
            </div>
            <div className="info">
              <div className="row">
                <div className="price col-md-6">
                  <h5>
                    {name}
                  </h5>
                  <h5 className="price-text-color">
                    {price}
                  </h5>
                </div>
                <div className="rating hidden-sm col-md-6">
                  <i className="price-text-color glyphicon glyphicon-star"></i>
                  <i className="price-text-color glyphicon glyphicon-star"></i>
                  <i className="price-text-color glyphicon glyphicon-star"></i>
                  <i className="glyphicon glyphicon-star"></i>
                </div>
              </div>
              <div className="separator clear-left">
                <p className="btn-add">
                  <i className="glyphicon glyphicon-shopping-cart"></i>
                  <a href="#" class="hidden-sm add-to-cart">Add to cart</a></p>
                <p className="btn-details">
                  <i className="glyphicon glyphicon-list"></i>
                  <Link to={url} class="hidden-sm">More details</Link>
                </p>
              </div>
              <div className="clearfix">
              </div>
            </div>
          </div>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        <div className="container marketing">
          <div className="row">
            {this.renderList()}
          </div>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('products')
  return { products: Products.find().fetch() }
}, ProductsList)
