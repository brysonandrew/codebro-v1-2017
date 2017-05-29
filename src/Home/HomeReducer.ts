import * as Immutable from "immutable";
import {
    UPDATE__PAGE_INDEX,
    UPDATE__VIEW_INDEX,
    UPDATE__VIEWPORT_DIMENSIONS,
    SET__TRANSITION__SCREEN,
    SET__VIEW__MODE,
    SET__PAGE_STATUS__LEAVE
} from "./HomeActions";
import {createReducer} from "../redux/utils/reducers";

export interface IHomeState {
    activePageIndex: number
    activeViewIndex: number
    width: number
    height: number
    isScreenUp: boolean
    isTabletMode: boolean
    isLoadingExternalLink: boolean
}

let initialState : IHomeState = {
    activePageIndex: -1,
    activeViewIndex: -1,
    width: 1920,
    height: 1080,
    isScreenUp: false,
    isTabletMode: false,
    isLoadingExternalLink: false
};

export let homeReducer = createReducer<IHomeState>(initialState, [
    {
        action: UPDATE__PAGE_INDEX,
        handler: function (state: IHomeState, action: UPDATE__PAGE_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['activePageIndex'], action.activePageIndex)
                .toJS();
        }
    },
    {
        action: UPDATE__VIEW_INDEX,
        handler: function (state: IHomeState, action: UPDATE__VIEW_INDEX) {
            return Immutable.fromJS(state)
                .setIn(['activeViewIndex'], action.activeViewIndex)
                .toJS();
        }
    },
    {
        action: UPDATE__VIEWPORT_DIMENSIONS,
        handler: function (state: IHomeState, action: UPDATE__VIEWPORT_DIMENSIONS) {
            return Immutable.fromJS(state)
                .setIn(['width'], action.width)
                .setIn(['height'], action.height)
                .toJS();
        }
    },
    {
        action: SET__TRANSITION__SCREEN,
        handler: function (state: IHomeState, action: SET__TRANSITION__SCREEN) {
            return Immutable.fromJS(state)
                .setIn(['isScreenUp'], action.isScreenUp)
                .toJS();
        }
    },
    {
        action: SET__VIEW__MODE,
        handler: function (state: IHomeState, action: SET__VIEW__MODE) {
            return Immutable.fromJS(state)
                .setIn(['isTabletMode'], action.isTabletMode)
                .toJS();
        }
    },
    {
        action: SET__PAGE_STATUS__LEAVE,
        handler: function (state: IHomeState, action: SET__PAGE_STATUS__LEAVE) {
            return Immutable.fromJS(state)
                .setIn(['isLoadingExternalLink'], action.isLoadingExternalLink)
                .toJS();
        }
    }
]);
