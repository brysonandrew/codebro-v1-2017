import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { changePageIndex, changeViewIndex, changeViewportDimensions } from './HomeActionCreators';
import { MenuFromStore } from '../Menu/Menu';
import { Background } from "../Widgets/Background/Background";
import { Logo } from "../Widgets/Logo/Logo";
import { pageLinks } from "../data/pages";
import { IParams } from "../data/models";
import { colors } from "../data/themeOptions";

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onResizeViewport?: (width: number, height: number) => void
    onViewIndexSelect?: (viewIndex: number) => void
    onPageIndexSelect?: (pageIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {
    params: IParams
}

interface IState extends IProperties, ICallbacks {
    isMini?: boolean
    isScreenUp?: boolean
}

export class Home extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMini: false,
            isScreenUp: this.props.activePageIndex > -1
        };
    }

    componentDidMount() {
        const { params, onResizeViewport, onPageIndexSelect, onViewIndexSelect } = this.props;
        //routing
        /////SET PAGE
        let activePageIndex = Immutable.List(pageLinks)
                                       .findIndex(item =>
                                            item.path === params.activePagePath);
        onPageIndexSelect(activePageIndex);
        if (activePageIndex > -1) {
            /////SET VIEW
            let activeViewIndex = Immutable.List(pageLinks[activePageIndex].viewPaths)
                                           .findIndex(item =>
                                                item === params.activeViewPath);
            onViewIndexSelect(activeViewIndex);
        }
        //responsive on window resize
        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
    }

    componentWillReceiveProps(nextProps) {
        const { onPageIndexSelect, onViewIndexSelect, params } = this.props;
        if (nextProps.width !== this.props.width) {
            this.setState({
                isMini: (nextProps.width < 600)
            })
        }
        if (nextProps.activePageIndex !== this.props.activePageIndex) {
            this.setState({
                isScreenUp: nextProps.activePageIndex > -1
            });
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
                                               .findIndex(item =>
                                                    item === nextProps.params.activeView);
                onViewIndexSelect(activeViewIndex);
            }
        }
    }

    public render(): JSX.Element {
        const {isScreenUp} = this.state;
        const { activePageIndex } = this.props;
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
            home__content: {
                position: "absolute",
                width: "100%",
                height: "100%",
                textAlign: "center",
                zIndex: 6
            },
            home__logo: {
                position: "absolute",
                top: this.state.isMini && (this.props.activePageIndex===-1)
                        ? "85.5vh" : "4.5vh",
                left: "2vw",
                width: "100%",
                textAlign: "left",
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
                top: "calc(4.5vh +  80px)",
                left: "2vw",
            },
            home__introHeader: {
                position: "absolute",
                top: "2vh",
                right: "4vw",
            },
            home__pageTransitionScreen: {
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100vh"
            }
        };
        const isFrontPage = activePageIndex===-1;
        const screenColors = isScreenUp ? Object.keys(colors) : Object.keys(colors).reverse();
        console.log(activePageIndex)
        return (
            <div style={styles.home}>
                <div style={styles.home__logo}>
                    <Logo
                        activePageIndex={activePageIndex}
                    />
                </div>
                {isFrontPage
                    ?   <div style={styles.home__frontPage}>
                            <div style={styles.home__menu}>
                                <MenuFromStore/>
                            </div>
                        </div>
                    :   <div style={styles.home__content}>
                            {pageLinks[activePageIndex].component}
                        </div>}
                {screenColors.map((key, i) =>
                    <div
                        key={i}
                        style={Object.assign({}, styles.home__pageTransitionScreen,
                                {
                                    background: colors[key],
                                    transform: `scaleY(${isScreenUp ? 1 : 0})`,
                                    transition: "transform 600ms",
                                    transitionDelay: `${400 * i}ms`,
                                    zIndex: isScreenUp ? (i + 4) : (4 - i)
                                })}    />)}
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
        activeViewIndex: state.homeStore.activeViewIndex
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onResizeViewport: (width, height) => {
            dispatch(changeViewportDimensions(width, height));
        },
        onPageIndexSelect: (activePageIndex) => {
            dispatch(changePageIndex(activePageIndex));
        },
        onViewIndexSelect: (activeViewIndex) => {
            dispatch(changeViewIndex(activeViewIndex));
        }
    }
}

export let HomeFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Home);
