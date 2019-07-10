import { action, observable } from 'mobx'
import React from 'react'
import { ILoginFieldsProps, ILoginStateProps } from './types'

class LoginStore {
  @observable public state: ILoginStateProps = {
    fields: {
      username: {
        value: '12345678'
      },
      password: {
        value: '12345678'
      }
    }
  }

  @action.bound public handleFieldsChange(changedFields: ILoginFieldsProps) {
    this.state = {
      fields: {
        ...this.state.fields,
        ...changedFields
      }
    }
  }
}

export const LoginStoreContext = React.createContext(new LoginStore())
