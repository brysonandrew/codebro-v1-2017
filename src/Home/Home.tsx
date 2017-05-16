import * as React from 'react';
import * as Immutable from 'immutable';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { changePageIndex, changeViewIndex, changeViewportDimensions } from './HomeActionCreators';
import { MenuFromStore } from '../Widgets/Menu';
import { PostsFromStore } from "../Widgets/Posts/Posts";
import { BackgroundFromStore } from "../Widgets/Background/Background";
import { Logo } from "../Widgets/Logo/Logo";
import { pages } from "../data/pages";
import { IntroHeader } from "../Widgets/IntroHeader/IntroHeader";
import { SlideshowFromStore } from "../Widgets/Slideshow/Slideshow";
import { IComponentType, IHomeParams } from "../models";

interface IProperties {
    activePageIndex?: number
    activeViewIndex?: number
    width?: number
}

interface ICallbacks {
    onResizeViewport?: (width: number, height: number) => void
    onViewIndexSelect?: (viewIndex: number) => void
    onPageIndexSelect?: (pageIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {
    params: IHomeParams
}

interface IState extends IProperties, ICallbacks {
    isMini: boolean
}

export class Home extends React.Component<IProps, IState> {

    componentIndex = 0;

    componentTypes: IComponentType[] = [
        {
            handle:     "post",
            component:  <PostsFromStore/>
        },
        {
            handle:     "slideshow",
            component:  <SlideshowFromStore/>
        }
    ];

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMini: false
        };
    }

    componentDidMount() {
        const { params, onResizeViewport, onPageIndexSelect, onViewIndexSelect } = this.props;
        //routing
        /////SET PAGE
        let activePageIndex = Immutable.List(pages)
                                .findIndex((item, index) =>
                                    item.path === params.activePage);
        onPageIndexSelect(activePageIndex);
        if (activePageIndex > -1) {
            /////SET VIEW
            let activeViewIndex = Immutable.List(pages[activePageIndex].viewPaths)
                                    .findIndex(item =>
                                        item === params.activeView);
            onViewIndexSelect(activeViewIndex);
            /////SET COMPONENT TYPE
            this.componentIndex = Immutable.List(this.componentTypes)
                                    .findIndex((item, index) =>
                                        item.handle === pages[activePageIndex].componentType);
        }
        //responsive on window resize
        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window
                .innerHeight));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight));
    }

    componentWillReceiveProps(nextProps) {
        const { onPageIndexSelect, onViewIndexSelect } = this.props;
        if (nextProps.width !== this.props.width) {
            this.setState({
                isMini: (nextProps.width < 600)
            })
        }
        if (nextProps.activePageIndex !== this.props.activePageIndex) {
            if (nextProps.activePageIndex > -1){
                /////SET PAGE
                let activePageIndex = Immutable.List(pages)
                                        .findIndex((item, index) =>
                                            item.path === nextProps.params.activePage);
                onPageIndexSelect(activePageIndex);
                if (activePageIndex > -1) {
                    /////SET VIEW
                    let activeViewIndex = Immutable.List(pages[activePageIndex].viewPaths)
                                            .findIndex(item =>
                                                item === nextProps.params.activeView);
                    onViewIndexSelect(activeViewIndex);
                    /////SET COMPONENT TYPE
                    this.componentIndex = Immutable.List(this.componentTypes)
                                            .findIndex((item, index) =>
                                                item.handle === pages[activePageIndex].componentType);
                }
            } else {
                this.props.onViewIndexSelect(-1);
            }
        }
    }

    public render(): JSX.Element {
        let styles = {
            home: {

            },
            home__content: {
                position: "fixed",
                height: "100vh",
                width: "100vw",
                textAlign: "center",
                zIndex: 2
            },
            home__logo: {
                position: "absolute",
                top: this.state.isMini && (this.props.activePageIndex===-1)
                        ? "85.5vh" : "4.5vh",
                left: "2vw",
                width: "100%",
                textAlign: "left"
            },
            home__introHeader: {
                position: "absolute",
                top: "2vh",
                right: "4vw",
            }
        };
        return (
            <div style={styles.home}>
                <div style={styles.home__content}>
                    <div style={styles.home__logo}>
                        <Logo
                            activePageIndex={this.props.activePageIndex}
                        />
                    </div>
                    <div style={styles.home__introHeader}>
                        <IntroHeader
                            isOnFrontPage={(this.props.activePageIndex===-1)}
                        />
                    </div>
                    <MenuFromStore/>
                    {(this.props.activePageIndex > -1)
                        ?   this.componentTypes[this.componentIndex].component
                        :   null}
                </div>
                <BackgroundFromStore/>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
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
