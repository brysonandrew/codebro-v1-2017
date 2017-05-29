import {
    UPDATE__PAGE_INDEX,
    UPDATE__VIEW_INDEX,
    UPDATE__VIEWPORT_DIMENSIONS,
    SET__TRANSITION__SCREEN,
    SET__VIEW__MODE,
    SET__PAGE_STATUS__LEAVE
} from "./HomeActions";
import { createAction } from "../redux/utils/actions";

export function changeViewportDimensions(width, height) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__VIEWPORT_DIMENSIONS>(UPDATE__VIEWPORT_DIMENSIONS.type, {
            width: width,
            height: height,
        }));
    }
}

export function changePageIndex(activePageIndex) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__PAGE_INDEX>(UPDATE__PAGE_INDEX.type, {
            activePageIndex: activePageIndex,
        }));
    }
}

export function changeViewIndex(activeViewIndex) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<UPDATE__VIEW_INDEX>(UPDATE__VIEW_INDEX.type, {
            activeViewIndex: activeViewIndex,
        }));
    }
}

export function setTransitionScreen(isScreenUp) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<SET__TRANSITION__SCREEN>(SET__TRANSITION__SCREEN.type, {
            isScreenUp: isScreenUp
        }));
    }
}


export function setViewMode(isTabletMode) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<SET__VIEW__MODE>(SET__VIEW__MODE.type, {
            isTabletMode: isTabletMode
        }));
    }
}

export function leavePage(isLeaving) {
    return dispatch => {
        // We dispatch the init action before fetching the data
        dispatch(createAction<SET__PAGE_STATUS__LEAVE>(SET__PAGE_STATUS__LEAVE.type, {
            isLoadingExternalLink: isLeaving
        }));
    }
}




