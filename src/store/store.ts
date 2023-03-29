import { v1Api } from './../http/ApiSetup'
import { RootReducer } from './Reducers/RootReducer'
// import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({ reducer: RootReducer })

import { configureStore, PreloadedState, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: RootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(v1Api.middleware),
  })

export const store = setupStore()

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof RootReducer>
export type AppStore = ReturnType<typeof setupStore>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
