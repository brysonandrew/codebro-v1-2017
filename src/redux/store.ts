import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {reducer, IStoreState} from "./main_reducer";
import {isBrowser} from '../utils/isomorphic_utils';
import {Middleware} from "redux";
const createLogger = require('redux-logger');

const logger = createLogger();


export var store : Redux.Store<IStoreState> = createStore(
    reducer,
    applyMiddleware(thunk, logger)
);


/**
 * Creates the public store using the given preloadedState (optional)
 *
 * Note: If preloadedState is not provided, the store will be initialized as normally
 *
 * @param preloadedState    Preloaded state of the store
 */
export function createBlogStore(preloadedState?: IStoreState) : Redux.Store<IStoreState> {
    const middlewares : Middleware[] = [thunk];
    if(isBrowser()) {
        middlewares.push(logger);
    }
    store = createStore.call(this, reducer, preloadedState, applyMiddleware(...middlewares));
    return store;
}

/**
 * Returns the public store (if it exists)
 */
export function getStore(): Redux.Store<IStoreState> {
    return store
}

/**
 * Returns the state of the store after being initialized (default values specified within reducers)
 *
 * Note: Use this method whenever you need to construct a valid store state to be used for preloading the store
 */
export function getInitializedStoreState() : IStoreState {
    return createBlogStore().getState();
}
