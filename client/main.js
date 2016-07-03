import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/app'
import ProductViewer from './components/product_viewer'
import Index from './components/index'
import About from './components/about'
import Contact from './components/contact'
import ProductMain from './components/product_main'
import Cart from './components/cart'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="product/:productId" component={ProductViewer}/>
      <Route path="about" component={About}/>
      <Route path="contact" component={Contact}/>
      <Route path="editproduct/:productId" component={ProductMain}/>
      <Route path="cart" component={Cart} />
    </Route>
  </Router>
)

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.render-target'))
})
