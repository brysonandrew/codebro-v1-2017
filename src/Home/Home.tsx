import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import {
    changePageIndex, changeViewIndex, changeViewportDimensions, setViewMode,
    setTransitionScreen, leavePage
} from './HomeActionCreators';
import { MenuFromStore } from '../Menu/Menu';
import { Background } from "../Widgets/Background/Background";
import { Logo } from "../Widgets/Logo/Logo";
import { pageLinks } from "../data/pages";
import { IParams } from "../data/models";
import { colors } from "../data/themeOptions";
import { PageTransitionScreen } from "../Widgets/PageTransitionScreen";
import { SocialMediaMenu } from "../Widgets/SocialMediaMenu";
import { Button } from "../Widgets/Button/Button";
import { ContactMessage } from "../Widgets/ContactMessage";

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
    height?: number
    isScreenUp?: boolean
    isTabletMode?: boolean
    isLoadingExternalLink?: boolean
}

interface ICallbacks {
    onResizeViewport?: (width: number, height: number, isTabletMode: boolean) => void
    onViewIndexSelect?: (viewIndex: number) => void
    onPageIndexSelect?: (pageIndex: number) => void
    onSetTransitionScreen?: (isScreenUp: boolean) => void
    onReEnterPage?: (isLeaving: boolean) => void
}

interface IProps extends IProperties, ICallbacks {
    params: IParams
}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isContactOpen?: boolean
    isScreenTransitionFinished?: boolean
}

export class Home extends React.Component<IProps, IState> {

    setTimeoutId;
    viewBreakPoint = 900;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isContactOpen: false,
            isScreenTransitionFinished: true
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
            this.setState({ isMounted: true });
        }, 0)
    }

    componentWillUnmount() {
        clearTimeout(this.setTimeoutId);
    }

    componentWillReceiveProps(nextProps) {
        const { onPageIndexSelect, onViewIndexSelect, params } = this.props;

        if (nextProps.activePageIndex !== this.props.activePageIndex && nextProps.activePageIndex === -1) {
            this.props.onSetTransitionScreen(false);
            if (this.props.activePageIndex===1) { //triggers if coming back from showroom
                this.props.onReEnterPage(false);
            }
        } else if (nextProps.activePageIndex !== this.props.activePageIndex && nextProps.activePageIndex > -1) {
            this.setState({ isScreenTransitionFinished: false });
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

    handleScreenTransitionEnd() {
        if (this.props.activePageIndex === -1 && !this.state.isScreenTransitionFinished) {
            this.setState({
                isScreenTransitionFinished: true
            })
        }
    }

    handleContactClick(isContactOpen) {
        this.setState({
            isContactOpen: isContactOpen
        })
    }

    public render(): JSX.Element {
        const { isContactOpen, isScreenTransitionFinished, isMounted } = this.state;
        const { isScreenUp, activePageIndex, activeViewIndex, params, isTabletMode, height, isLoadingExternalLink } = this.props;
        const isFrontPage = activePageIndex===-1;
        const isReadyToDisplayFront = isFrontPage && !isScreenUp && isScreenTransitionFinished;
        const isLogoCentered = isLoadingExternalLink;

        let styles = {
            home: {
                position: "relative",
                width: "100%",
                height: "100vh"
            },
            home__frontPage: {
                position: "absolute",
                width: "100%",
                height: "100%",
                textAlign: "center"
            },
            home__contactButton: {
                margin: 10
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
                top: isLogoCentered ? "50%" : "4.5vh",
                left: isLogoCentered ? "50%" : "2vw",
                width: "auto",
                transform: isLogoCentered ? `translate(-50%, -50%)` : null,
                zIndex: 8
            },
            home__background: {
                position: "fixed",
                left: 0,
                top: 0,
                background: "transparent",
                textAlign: "left"
            },
            home__menu: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate3d(-50%, -50%, 0)`,
                transition: "transform 400ms",
                transitionDelay: `${200}ms`,
                zIndex: isReadyToDisplayFront ? 10 : 2
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
            },
            home__contact: {
                MozTransform: isMounted
                                ?  "scale(1)"
                                :  "scale(0)",
                transform: isMounted
                                ?  "scale(1)"
                                :  "scale(0)",
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
                        isAnimating={isLoadingExternalLink}
                    />
                </div>
                {isFrontPage
                && <div style={styles.home__socialMedia}>
                        <SocialMediaMenu/>
                    </div>}
                {isFrontPage
                    ?   <div style={styles.home__frontPage}>
                            <div style={styles.home__contact}>
                                {(!isTabletMode || isContactOpen)
                                    ?   <ContactMessage
                                        isContactOpen={isContactOpen}
                                        isReady={isReadyToDisplayFront}
                                        onClick={this.handleContactClick.bind(this)}
                                    />
                                    :   <div style={styles.home__contactButton}>
                                        <Button text="contact" onClick={() => this.handleContactClick(true)}/>
                                    </div>
                                }
                            </div>
                            <div style={styles.home__menu}>
                                <MenuFromStore
                                    isScreenTransitionFinished={true}
                                />
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
                        onTransitionEnd={this.handleScreenTransitionEnd.bind(this)}
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
        isTabletMode: state.homeStore.isTabletMode,
        isLoadingExternalLink: state.homeStore.isLoadingExternalLink
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
        },
        onReEnterPage: (isLeaving) => {
            dispatch(leavePage(isLeaving));
        }
    }
}

export let HomeFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Home);
