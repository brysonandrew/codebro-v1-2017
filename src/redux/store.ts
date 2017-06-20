import * as Redux from 'redux';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer, IStoreState } from "./main_reducer";
import { isBrowser } from "../utils/isomorphic_utils";
const createLogger = require('redux-logger');
const logger = createLogger();
/**
 * Creates the public store using the given preloadedState (optional)
 *
 * Note: If preloadedState is not provided, the store will be initialized as normally
 *
 * @param preloadedState    Preloaded state of the store
 */
export const store = (preloadedState?: IStoreState) : Redux.Store<IStoreState> => {
    const middlewares : Redux.Middleware[] = [thunk];
    if(isBrowser()) {
        middlewares.push(logger);
    }
    return createStore.call(this, reducer, preloadedState, applyMiddleware(...middlewares));
};
/**
 * Returns the state of the store after being initialized (default values specified within reducers)
 *
 * Note: Use this method whenever you need to construct a valid store state to be used for preloading the store
 */
export function getInitializedStoreState() : IStoreState {
    return store().getState();
}
