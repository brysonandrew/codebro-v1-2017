import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import {
    changePageIndex, changeViewIndex, changeViewportDimensions, setViewMode,
    setTransitionScreen
} from './HomeActionCreators';
import { MenuFromStore } from '../Menu/Menu';
import { Background } from "../Widgets/Background/Background";
import { Logo } from "../Widgets/Logo/Logo";
import { pageLinks } from "../data/pages";
import { IParams } from "../data/models";
import { colors } from "../data/themeOptions";
import {PageTransitionScreen} from "../Widgets/PageTransitionScreen";
import {SocialMediaMenu} from "../Widgets/SocialMediaMenu";
import {CloseCross} from "../Widgets/CloseCross/CloseCross";

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
    height?: number
    isScreenUp?: boolean,
    isTabletMode?: boolean
}

interface ICallbacks {
    onResizeViewport?: (width: number, height: number, isTabletMode: boolean) => void
    onViewIndexSelect?: (viewIndex: number) => void
    onPageIndexSelect?: (pageIndex: number) => void
    onSetTransitionScreen?: (isScreenUp: boolean) => void
}

interface IProps extends IProperties, ICallbacks {
    params: IParams
}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isContactOpen?: boolean
}

export class Home extends React.Component<IProps, IState> {

    setTimeoutId;
    viewBreakPoint = 900;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isContactOpen: false
        };
    }

    componentDidMount() {
        const { params, onResizeViewport, onPageIndexSelect, onViewIndexSelect, onSetTransitionScreen } = this.props;
        //routing
        /////SET PAGE
        let activePageIndex = Immutable.List(pageLinks)
                                       .findIndex(item =>
                                            item.path === params.activePagePath);
        onPageIndexSelect(activePageIndex);
        if (activePageIndex > -1) {
            /////SET VIEW
            let activeViewIndex = Immutable.List(pageLinks[activePageIndex].viewPaths)
                                           .findIndex(item => item === params.activeViewPath);
            onViewIndexSelect(activeViewIndex);
            onSetTransitionScreen(true);
        }
        //responsive on window resize
        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight, window.innerWidth < this.viewBreakPoint));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight, window.innerWidth < this.viewBreakPoint));
        this.setTimeoutId = setTimeout(() => {
            this.setState({isMounted: true})
        }, 0)
    }

    componentWillUnmount() {
        clearTimeout(this.setTimeoutId);
    }

    componentWillReceiveProps(nextProps) {
        const { onPageIndexSelect, onViewIndexSelect, params } = this.props;

        if (nextProps.activePageIndex !== this.props.activePageIndex && nextProps.activePageIndex === -1) {
            this.props.onSetTransitionScreen(false);
        }
        if (JSON.stringify(nextProps.params) !== JSON.stringify(params)) {
            if (nextProps.params.activePagePath !== params.activePagePath){
                let activePageIndex = Immutable.List(pageLinks)
                                               .findIndex(item =>
                                                    item.path === nextProps.params.activePagePath);
                onPageIndexSelect(activePageIndex);
            }
            if (nextProps.params.activeViewPath !== params.activeViewPath){
                /////SET VIEW
                let activeViewIndex = Immutable.List(pageLinks[nextProps.activePageIndex].viewPaths)
                                               .findIndex(item => item === nextProps.params.activeViewPath);
                onViewIndexSelect(activeViewIndex);
            }
        }
    }

    handleContactClick(isContactOpen) {
        this.setState({
            isContactOpen: isContactOpen
        })
    }

    public render(): JSX.Element {
        const { isMounted, isContactOpen } = this.state;
        const { isScreenUp, activePageIndex, activeViewIndex, params, isTabletMode } = this.props;
        const isFrontPage = activePageIndex===-1;

        let styles = {
            home: {
                position: "relative",
                width: "100%",
                height: "100vh",
            },
            home__frontPage: {
                position: "absolute",
                width: "100%",
                height: "100%",
                textAlign: "center",
                zIndex: 2
            },
            home__message: {
                position: "relative",
                display: "inline-block",
                width: isContactOpen ? "64%" : "20%",
                margin: 20,
                padding: 20,
                borderRadius: 4,
                color: "#fafafa",
                fontSize: 16,
                background: colors.hi,
                border: `${colors.hi} 1px solid`,
                zIndex: 10
            },
            home__contactButton: {
                position: "relative",
                margin: 10,
                padding: "4px 10px",
                borderRadius: 4,
                color: "#fafafa",
                fontSize: 16,
                background: colors.hi,
                border: `${colors.hi} 1px solid`,
                cursor: "pointer"
            },
            home__contactCloseCross: {
                position: "absolute",
                top: 0,
                right: -10,
                cursor: "pointer"
            },
            home__content: {
                position: "absolute",
                width: "100%",
                height: "100%",
                textAlign: "center",
                zIndex: 6
            },
            home__logo: {
                position: "absolute",
                top: "4.5vh",
                left: "2vw",
                width: "auto",
                zIndex: 8
            },
            home__background: {
                position: "fixed",
                background: "transparent",
                textAlign: "left"
            },
            home__menu: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            },
            home__socialMedia: {
                position: "absolute",
                top: "20%",
                height: "14%",
                left: "2vw",
                transform: "translateY(-50)",
                zIndex: 8
            },
            home__introHeader: {
                position: "absolute",
                top: "2vh",
                right: "4vw",
            }
        };
        const screenColors = isScreenUp
                                ?   Object.keys(colors)
                                :   Object.keys(colors).reverse();
        return (
            <div style={styles.home}>
                <div style={styles.home__logo}>
                    <Logo
                        activePageIndex={activePageIndex}
                        activeViewIndex={activeViewIndex}
                        params={params}
                    />
                </div>
                {isFrontPage
                && <div style={styles.home__socialMedia}>
                        <SocialMediaMenu/>
                    </div>}
                {isFrontPage
                    ?   <div style={styles.home__frontPage}>
                            {!isTabletMode || isContactOpen
                                ?   <h1 style={styles.home__message}
                                        onClick={() => this.handleContactClick(false)}>
                                        {isContactOpen
                                            ?   <div style={styles.home__contactCloseCross}>
                                                    <CloseCross
                                                        size={20}
                                                        onClick={() => this.handleContactClick(false)}
                                                    />
                                                </div>
                                            :   null}
                                        {"Hey, Welcome, I'm a web-developer make yourself and home and if you have any questions write to me at "}
                                        <span>{"andrew@codebro.io"}</span>
                                    </h1>
                                :   <button
                                        style={styles.home__contactButton}
                                        onClick={() => this.handleContactClick(true)}>
                                        contact
                                    </button>}
                            <div style={styles.home__menu}>
                                <MenuFromStore/>
                            </div>
                        </div>
                    :   <div style={styles.home__content}>
                            {pageLinks[activePageIndex].component}
                        </div>}
                {screenColors.map((key, i) =>
                    <PageTransitionScreen
                        key={i}
                        index={i}
                        colorKey={key}
                        isScreenUp={isScreenUp}
                    />)}
                <div style={styles.home__background}>
                    <Background/>
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
        height: state.homeStore.height,
        activePageIndex: state.homeStore.activePageIndex,
        activeViewIndex: state.homeStore.activeViewIndex,
        isScreenUp: state.homeStore.isScreenUp,
        isTabletMode: state.homeStore.isTabletMode
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onResizeViewport: (width, height, isTabletMode) => {
            dispatch(changeViewportDimensions(width, height));
            dispatch(setViewMode(isTabletMode));
        },
        onPageIndexSelect: (activePageIndex) => {
            dispatch(changePageIndex(activePageIndex));
        },
        onViewIndexSelect: (activeViewIndex) => {
            dispatch(changeViewIndex(activeViewIndex));
        },
        onSetTransitionScreen: (isScreenUp) => {
            dispatch(setTransitionScreen(isScreenUp));
        }
    }
}

export let HomeFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Home);
