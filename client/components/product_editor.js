import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import Products from '../../imports/collections/products'
import ProductImages from '../../imports/collections/product_images'

class ProductEditor extends Component {
  constructor(props) {
    super(props);
    const { name, description, price } = this.props.product
    this.state = {
      file: '',
      imagePreviewUrl: '',
      name: name,
      description: description,
      price: price
    }
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

  onImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    fsFile = new FS.File(file)
    ProductImages.insert(fsFile, (error, result) => {
      if (error) {
        throw new Meteor.Error(error)
      } else {
        Meteor.call('product.update.image', this.props.product._id, result._id)
      }
    })
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  onNameChange(e) {
    const name = e.target.value
    this.setState({ name: name })
    Meteor.call('product.update.name', this.props.product._id, name)
  }
  onDescriptionChange(e) {
    const description = e.target.value
    this.setState({ description: description })
    Meteor.call('product.update.description', this.props.product._id, description)
  }
  onPriceChange(e) {
    const price = e.target.value
    this.setState({ price: price })
    Meteor.call('product.update.price', this.props.product._id, price)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} className="img-responsive" />);
    } else {
      $imagePreview = (<img src={this.props.product.image} className="img-responsive" />);
    }
    return (
      <div className="container product-main">
          <div className="row">
            <div className="col-md-7">
              {$imagePreview}
              <input
                onChange={this.onImageChange.bind(this)}
                className="fileInput"
                type="file"
              />
            </div>
            <div className="col-md-5">
              <label>Name:</label>
              <input
                onChange={this.onNameChange.bind(this)}
                ref="name"
                value={this.state.name}
                className="form-control"
              />
              <label>Description:</label>
              <input
                onChange={this.onDescriptionChange.bind(this)}
                ref="description"
                value={this.state.description}
                className="form-control"
              />
              <div className="row">
                <div className="col-md-12">
                  <label>Price:</label>
                  <input
                    onChange={this.onPriceChange.bind(this)}
                    ref="price"
                    value={this.state.price}
                    className="form-control"
                  />
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

      </div>
    )
  }
}

export default ProductEditor
