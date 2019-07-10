export interface ILoginFieldsProps {
  username: {
    value: string
  }
  password: {
    value: string
  }
}

export interface ILoginStateProps {
  fields: ILoginFieldsProps
}
