import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { Products } from '../imports/collections/products'
import App from './components/app'
import ProductViewer from './components/product_viewer'
import Index from './components/index'
import About from './components/about'
import Contact from './components/contact'
import ProductMain from './components/product_main'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="product/:productId" component={ProductViewer}/>
      <Route path="about" component={About}/>
      <Route path="contact" component={Contact}/>
      <Route path="editproduct/:productId" component={ProductMain}/>
    </Route>
  </Router>
)

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.render-target'))
})
