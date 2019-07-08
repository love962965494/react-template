import * as react from 'react'

declare module 'react' {
  interface HTMLAttributes<T> {
    styleName?: string;
  }
}