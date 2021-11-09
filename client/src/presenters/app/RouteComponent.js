import React from 'react'

const RouteComponent = ({ route, ...otherProps }) => {
  return (
    <>
      {/* app bar */}

      {/* error boundary */}
      <route.component {...otherProps} />
    </>
  )
}

export default RouteComponent
