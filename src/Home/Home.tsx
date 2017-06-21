import * as React from 'react';
import * as history from 'history';
import { connect } from 'react-redux';
import { IParams } from "../data/models";
import { IStoreState } from '../redux/main_reducer';
import { changeViewportDimensions, saveLocation, saveParams, toggleScrollAnimation } from './HomeActionCreators';
import { toParams } from "../data/helpers/toParams";
import { MenuFromStore } from "./ProjectsMenu/Menu";
import { PagesFromStore } from "./Body/Pages/Pages";
import { Heading } from "./Body/Heading/Heading";
import { BottomNavigationMenu } from "./BottomNavigationMenu/BottomNavigationMenu";

interface IProperties {
    savedParams?: IParams
    savedLocation?: Location
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    width?: number
    height?: number
}

interface ICallbacks {
    onLoad?: (nextLocation: history.Location, nextParams: IParams) => void
    onAnimationStart?: () => void
    onResizeViewport?: (width: number, height: number) => void
    onArrowNavigate?: (nextParams: IParams) => void
}

interface IProps extends IProperties, ICallbacks {
    location: history.Location
    history: history.History
}

interface IState extends IProperties, ICallbacks {
    isMounted: boolean
}

export class Home extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        }
    }

    componentDidMount() {
        const { onResizeViewport, onAnimationStart, history } = this.props;

        const params = toParams(history.location.pathname);

        if (params.activePagePath.length > 0) {
            onAnimationStart();
        }

        this.props.onLoad(
            history.location,
            params
        );

        this.timerId = setTimeout(() => this.setState({ isMounted: true }), 0);

        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
    }

    render(): JSX.Element {
        const { height, savedParams, onArrowNavigate, isMobile, isTablet, isLaptop} = this.props;
        const styles = {
            home: {
                position: "relative",
                background: "#eeeeee",
                overflow: "hidden"
            },
            home__heading: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 4

            },
            home__bottomNav: {
                position: "fixed",
                top: height * 0.9,
                width: "100%"
            }
        } as any;
        return (
            <div style={ styles.home }>
                <div style={ styles.home__heading}>
                    <Heading
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isLaptop={isLaptop}
                    />
                </div>
                <div>
                    <PagesFromStore
                        history={this.props.history}
                    />
                </div>
                <div style={ styles.home__bottomNav }>
                    <BottomNavigationMenu
                        onArrowNavigation={onArrowNavigate}
                        savedParams={savedParams}
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
        savedLocation: state.homeStore.savedLocation,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onLoad: (nextLocation, nextParams) => {
            dispatch(saveLocation(nextLocation));
            dispatch(saveParams(nextParams));
        },
        onAnimationStart: () => {
            dispatch(toggleScrollAnimation(true));
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
