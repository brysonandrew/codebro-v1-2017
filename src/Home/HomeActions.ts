//NAVIGATION
export module UPDATE__PAGE_INDEX {
    export let type = "UPDATE__PAGE_INDEX";
}

export interface UPDATE__PAGE_INDEX {
    activePageIndex: number
}

export module UPDATE__VIEW_INDEX {
    export let type = "UPDATE__VIEW_INDEX";
}

export interface UPDATE__VIEW_INDEX {
    activeViewIndex: number
}
//MODES
export module UPDATE__VIEWPORT_DIMENSIONS {
    export let type = "UPDATE__VIEWPORT_DIME";
}

export interface UPDATE__VIEWPORT_DIMENSIONS {
    width: number
    height: number
}

export module SET__TRANSITION__SCREEN {
    export let type = "SET__TRANSITION__SCREEN";
}

export interface SET__TRANSITION__SCREEN {
    isScreenUp: boolean
}

export module SET__VIEW__MODE {
    export let type = "SET__VIEW__MODE";
}

export interface SET__VIEW__MODE {
    isTabletMode: boolean
}
