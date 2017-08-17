import * as React from 'react';
import * as history from 'history';
import { connect } from 'react-redux';
import { IParams } from "../data/models";
import { IStoreState } from '../redux/main_reducer';
import { changeViewportDimensions, saveLocation, saveParams, toggleScrollAnimation } from './HomeActionCreators';
import { toParams } from "../data/helpers/toParams";
import { HeadingFromStore } from "./Body/Heading/Heading";
import { match } from 'react-router';
import { Pages } from './Body/Pages/Pages';

interface IProperties {
    savedParams?: IParams
    savedLocation?: Location
    isPreviewExtended?: boolean
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    width?: number
    height?: number
}

interface ICallbacks {
    onLocationListen?: (nextParams: IParams) => void
    onLoad?: (nextParams: IParams) => void
    onResizeViewport?: (width: number, height: number) => void
    onArrowNavigate?: (nextParams: IParams) => void
}

interface IProps extends IProperties, ICallbacks {
    match: match<IParams>
    location: history.Location
    history: history.History
}

interface IState extends IProperties, ICallbacks {
    isMounted: boolean
}

export class Home extends React.Component<IProps, IState> {

    timerId;

    constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        }
    }

    componentDidMount() {
        const { onResizeViewport, history, onLocationListen, onLoad } = this.props;
//reset window pos
        window.scroll(0, 0);
//initial save params
        onLoad(toParams(history.location.pathname));
//listen to future params
        history.listen( location =>  {

            onLocationListen(
                toParams(location.pathname)
            );

        });

        this.timerId = setTimeout(() => this.setState({ isMounted: true }), 0);

        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
    }


    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render(): JSX.Element {
        const {
            isTablet,
            isPreviewExtended,
            match,
            history,
            savedParams
        } = this.props;
        const { isMounted } = this.state;

        const styles = {
            home: {
                position: "relative",
                background: "#eeeeee",
                overflow: "hidden",
                opacity: isMounted ? 1 : 0,
                filter: isMounted ? "none" : "blur(10px)",
                transition: "opacity 800ms, filter 800ms"
            },
            home__heading: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                opacity:  isPreviewExtended ? 0.4 : 1,
                filter: `grayscale(${isPreviewExtended ? 100 : 0}%) blur(${isPreviewExtended ? 2 : 0}px)`,
                zIndex: isPreviewExtended ? 0 : 4,
                transition: "filter 400ms, opacity 400ms"
            }
        } as any;

        return (
            <div style={ styles.home }>
                <div style={ styles.home__heading}>
                    <HeadingFromStore
                        history={history}
                    />
                </div>
                <div>
                    <Pages
                        savedParams={savedParams}
                        history={history}
                    />
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        height: state.homeStore.height,
        width: state.homeStore.width,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        isPreviewExtended: state.homeStore.isPreviewExtended,
        savedLocation: state.homeStore.savedLocation,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onLoad: (nextParams) => {
            dispatch(saveParams(nextParams));
        },
        onLocationListen: (nextParams) => {
            dispatch(saveParams(nextParams));
        },
        onResizeViewport: (width, height) => {
            dispatch(changeViewportDimensions(width, height));
        },
        onArrowNavigate: (nextParams) => {
            dispatch(saveParams(nextParams));
            dispatch(toggleScrollAnimation(true));
        }
    }
}

export const HomeFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Home);
