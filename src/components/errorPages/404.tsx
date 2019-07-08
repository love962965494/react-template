import React from 'react'
import { RouteProps } from 'react-router'

export default ({ location }: RouteProps) => {
  return (
    <div>
      <h3>
        No match for <code>{location!.pathname}</code>
      </h3>
    </div>
  )
}
