import * as Redux from 'redux';
import {homeReducer, IHomeState} from '../Home/HomeReducer';
import Reducer = Redux.Reducer;
/**
 * State of the admin panel store
 */
export interface IStoreState {
    homeStore: IHomeState
}

export let reducer : Reducer<IStoreState> = Redux.combineReducers({
    homeStore: homeReducer,
    // Add other reducers here
}) as Reducer<IStoreState>;
