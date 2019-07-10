import * as react from 'react'

declare module 'react' {
  interface HTMLAttributes<T> {
    styleName?: string
  }
}

declare global {
  module JSX {
    interface IntrinsicAttributes {
      styleName?: string
    }
  }
}
