import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import { ProductImages } from '../../imports/collections/products'

class ProductEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { image: this.props.product.image }
  }
  onFormChange(event) {
    const { name, description, price } = this.refs
    Meteor.call('product.update', this.props.product._id, name.value, description.value, price.value)
  }
  onProductRemove(event) {
    event.preventDefault()
    Meteor.call('product.remove', this.props.product._id, (error,result) => {
      if (result) {
        browserHistory.push(`/`)
      } else {
        console.log(error)
      }
    })
  }
  onImageChange(event) {
    event.preventDefault()
    const file = this.refs.productImage.files[0]
    if (file) {
      fsFile = new FS.File(file)
      ProductImages.insert(fsFile, (error, result) => {
        if (error) {
          throw new Meteor.Error(error)
        } else {
          Meteor.call('product.updateImage', this.props.product._id, result._id)
          this.setState({ image: this.props.product.image })
          this.forceUpdate()
        }
      })
    }
  }
  render() {
    console.log(this.props.product.image)
    if (!this.props.product.image) { return <div>Loading...</div>}
    const { name, image, description, price } = this.props.product
    return (
      <div className="container product-main">
        <form onChange={this.onFormChange.bind(this)}>
          <div className="row">
            <div className="col-md-7">
              <img src={this.state.image} />
                Upload Profile Image:
                <input
                  onChange={this.onImageChange.bind(this)}
                  type="file"
                  ref="productImage"
                />
            </div>
            <div className="col-md-5">
              <label>Name:</label><input ref="name" className="form-control"/>
              <label>Description:</label><input ref="description" className="form-control"/>
              <div className="row">
                <div className="col-md-12">
                  <label>Price:</label><input ref="price" className="form-control"/>
                  <hr/>
                  <p>
                    <button
                      onClick={this.onProductRemove.bind(this)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                    <button className="btn btn-default">
                      Save
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

      </div>
    )
  }
}

export default ProductEditor
