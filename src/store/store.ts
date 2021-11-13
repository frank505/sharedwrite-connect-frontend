import { createStore, applyMiddleware, StoreEnhancerStoreCreator, Store } from 'redux';
import thunk from 'redux-thunk';
import {RootReducer} from './Reducers/RootReducer';
export const middlewares:Array<any> = [thunk];

export const createStoreWithMiddleware:StoreEnhancerStoreCreator<any> = applyMiddleware(...middlewares)(createStore)

export const store:Store = createStoreWithMiddleware(RootReducer)








