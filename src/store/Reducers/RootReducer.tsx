import { CombinedState, combineReducers, Reducer } from 'redux'
import { v1Api } from '../../http/ApiSetup'
import { AppBarReducer } from './AppBarReducer'

export const RootReducer: CombinedState<Reducer> = combineReducers({
  appBar: AppBarReducer,
  [v1Api.reducerPath]: v1Api.reducer,
})

export type RootState = ReturnType<typeof RootReducer>
