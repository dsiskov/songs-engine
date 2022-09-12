import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import RouteComponent from 'presenters/app/RouteComponent'

const Router = ({ routes }) => {
  Router.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object)
  }

  return (
    <React.Fragment>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          {...(route.exact ? { exact: route.exact } : {})}
          render={(props) => <RouteComponent route={route} {...props} />}
        />
      ))}
    </React.Fragment>
  )
}

export default Router
