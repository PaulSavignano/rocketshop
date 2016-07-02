import React from 'react'

import ProductsList from './products_list'

const Index = (props) => {
  console.log(props)
  return (
    <div>
      <div className="cover">
        <div className="clearfix"></div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Welcome to The Rocket Shop</h1>
              <p className="lead">
                To Mars With You!
              </p>
            </div>
          </div>
          <hr/>
        </div>
      </div>
      <ProductsList />
    </div>
  )
}

export default Index
