import React from 'react'
import PropTypes from 'prop-types'

const RouteComponent = ({ route, ...otherProps }) => {
  RouteComponent.propTypes = {
    route: PropTypes.object
  }
  return (
    <>
      {/* app bar */}

      {/* error boundary */}
      <route.component {...otherProps} />
    </>
  )
}

export default RouteComponent
