import React, {useEffect,useContext,useReducer} from 'react';
import reducer,{initialState} from './reducer';


export function createCtx<StateType, ActionType>(
    reducer: React.Reducer<StateType, ActionType>,
    initialState: StateType,
  ) {
    const defaultDispatch: React.Dispatch<ActionType> = () => initialState
    const ctx = React.createContext({
      state: initialState,
      dispatch: defaultDispatch,
    })
    function Provider(props: React.PropsWithChildren<{}>) {
      const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState)
      return <ctx.Provider value={{ state, dispatch }} {...props} />
    }
    return [ctx, Provider] as const
}
const [ctx, DataProvider] = createCtx(reducer, initialState)
export const DataLayer = DataProvider
export const DataContext = ctx