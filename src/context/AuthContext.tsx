import React, { createContext, Dispatch, SetStateAction } from 'react'

export interface IAuthContext {
  user: string | null
  setUser: Dispatch<SetStateAction<string | null>>
}

const defaultAuthContext: IAuthContext = {
  user: null,
  setUser: () => {},
}

export const AuthContext = createContext<IAuthContext>(defaultAuthContext)
