import { configureStore, Store } from '@reduxjs/toolkit'
import { v1Api } from './http/ApiSetup'


const initialState = {
  sidebarShow: true,
}

const changeState = (state = initialState, { type, ...rest }:any) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}


export const store:Store  = configureStore({
  reducer: {
    changeState,
    [v1Api.reducerPath]: v1Api.reducer,
   },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(v1Api.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
