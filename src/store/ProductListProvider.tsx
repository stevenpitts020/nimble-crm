import React, { useReducer } from 'react'
import { log, institutionService } from '../services'
import { IStateMachine, IProvider, IProduct } from '.'
import useErrorHandler from '../hooks/useErrorHandler'

interface IProductListState extends IStateMachine {
  products: IProduct[]
}

export const initialState: IProductListState = {
  status: 'idle',
  products: [],
}

interface IAction {
  type: 'fetch' | 'resolve' | 'reject' | 'cancel'
}

interface IResolveAction extends IAction {
  payload: {
    products: IProduct[]
  }
}

interface IRejectAction extends IAction {
  payload: string
}

type IReducer = (
  prevState: IProductListState,
  action: IAction | IRejectAction | IResolveAction
) => IProductListState

const reducer = (prevState: IProductListState, action: IAction) => {
  switch (action.type) {
    case 'fetch':
      return {
        ...prevState,
        status: 'loading',
      }
    case 'resolve':
      return {
        ...prevState,
        status: 'success',
        products: (action as IResolveAction).payload.products,
        error: undefined,
      }
    case 'reject':
      return {
        ...prevState,
        status: 'failure',
        error: (action as IRejectAction).payload,
        products: [],
      }
    case 'cancel':
      return {
        ...prevState,
        status: 'idle',
        error: undefined,
        products: [],
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

interface IProductListContext {
  state: IProductListState
  dispatch: (action: IAction | IRejectAction | IResolveAction) => void
  list: (id: string) => void
  clear: () => void
}

export const ProductListContext = React.createContext({} as IProductListContext)

export const ProductListProvider = (props: IProvider) => {
  const [state, dispatch] = useReducer<IReducer>(reducer, initialState)
  const handleError = useErrorHandler()

  const list = async (id: string) => {
    try {
      dispatch({ type: 'fetch' })

      const products: IProduct[] = await institutionService.getProducts(id)

      dispatch({
        type: 'resolve',
        payload: {
          products,
        },
      })

      log.info(products, 'listProducts')
    } catch (error) {
      handleError(error, () => {
        log.error(error, 'listProducts')
        dispatch({
          type: 'reject',
          payload: institutionService.errorMessage(error),
        })
      })
    }
  }

  const clear = () => {
    dispatch({ type: 'cancel' })
    return
  }

  return (
    <ProductListContext.Provider
      value={{
        state,
        dispatch,
        list,
        clear,
      }}
    >
      {props.children}
    </ProductListContext.Provider>
  )
}
