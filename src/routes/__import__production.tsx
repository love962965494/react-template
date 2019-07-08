import React from 'react'
import loadable from 'react-loadable'

const importComponent = (file: string) =>
  loadable({
    loader: () => import('../containers/' + file),
    loading: () => <div />
  })

export default importComponent
