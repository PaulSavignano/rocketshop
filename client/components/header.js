import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import Accounts from './accounts'

class Header extends Component {
  onProductClick(event) {
    event.preventDefault()
    Meteor.call('product.insert', (error, result) => {
      browserHistory.push(`editproduct/${result}`)
    })
  }
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Rocket Shop</Link>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="/products">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li>
                <a
                  onClick={this.onProductClick.bind(this)}
                  href="#"
                >
                  Create Product
                </a>
              </li>
              <li><Accounts /></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header
