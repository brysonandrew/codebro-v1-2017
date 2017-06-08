import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { changeViewportDimensions, setViewMode, saveLocation
} from './HomeActionCreators';
import { MenuFromStore } from '../Menu/Menu';
import { Background } from "../Widgets/Background/Background";
import { Logo } from "../Widgets/Logo/Logo";
import { pages } from "../data/pages";
import { IParams } from "../data/models";
import { SocialMediaMenu } from "../Widgets/SocialMediaMenu/SocialMediaMenu";
import { match, Switch, Route } from "react-router-dom";
import { Contact } from "../Contact/Contact";

interface IProperties {
    width?: number
    height?: number
    isTabletMode?: boolean
    isLoadingExternalLink?: boolean
    savedLocation?: Location
    savedParams?: IParams
}

interface ICallbacks {
    onResizeViewport?: (width: number, height: number, isTabletMode: boolean) => void
    onSaveLocation?: (nextLocation: Location) => void
}

interface IProps extends IProperties, ICallbacks {
    match: match<IParams>
}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
}

export class Home extends React.Component<IProps, IState> {

    setTimeoutId;
    viewBreakPoint = 900;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentWillMount() {
        this.props.onSaveLocation(this.props["history"].location);
    }

    componentDidMount() {
        const { onResizeViewport } = this.props;

        this.props["history"].listen( location =>  {
            if (location.pathname !== this.props.savedLocation.pathname) { // all i care about is the pathname
                this.props.onSaveLocation(location);
            }
        });

        window.addEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight, window.innerWidth < this.viewBreakPoint));
        window.addEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight, window.innerWidth < this.viewBreakPoint));
        this.setTimeoutId = setTimeout(() => {
            this.setState({ isMounted: true });
        }, 0)
    }

    componentWillUnmount() {
        const { onResizeViewport } = this.props;

        window.removeEventListener("resize"
            , () => onResizeViewport(window.innerWidth, window.innerHeight, window.innerWidth < this.viewBreakPoint));
        window.removeEventListener("load"
            , () => onResizeViewport(window.innerWidth, window.innerHeight, window.innerWidth < this.viewBreakPoint));
        clearTimeout(this.setTimeoutId);
    }

    public render(): JSX.Element {
        const { isMounted } = this.state;
        const { match, isTabletMode, isLoadingExternalLink, height } = this.props;
        const isLogoCentered = isLoadingExternalLink;
        const isFirstPage = !("activePagePath" in match.params);

        const styles = {
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
            home__logo: {
                position: "absolute",
                top: isLogoCentered ? "50%" : "4.5vh",
                left: isLogoCentered ? "50%" : "2vw",
                width: "auto",
                transform: isLogoCentered && `translate(-50%, -50%)`,
                zIndex: 8
            },
            home__menu: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate3d(-50%, -50%, 0)`,
                transition: "transform 400ms",
                transitionDelay: `${200}ms`,
                zIndex: 2
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
            home__content: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                textAlign: "center",
                zIndex: 6
            },
            home__background: {
                position: "fixed",
                left: 0,
                top: 0,
                background: "transparent",
                textAlign: "left"
            }
        } as any;

        return (
            <div style={styles.home}>

                <div style={styles.home__logo}>
                    <Logo
                        params={match.params}
                        isAnimating={isLoadingExternalLink}
                    />
                </div>
                {isFirstPage
                &&  <div style={styles.home__socialMedia}>
                        <SocialMediaMenu/>
                    </div>}
                {isFirstPage
                    ?  <div style={styles.home__frontPage}>
                                <div>
                                    <Contact
                                        isTabletMode={isTabletMode}
                                        isMounted={isMounted}
                                    />
                                </div>
                                <div style={styles.home__menu}>
                                   <MenuFromStore/>
                                </div>
                            </div>
                    :   <div style={styles.home__content}>
                                {pages[match.params.activePagePath].component}
                            </div>}
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
        savedLocation: state.homeStore.savedLocation,
        isTabletMode: state.homeStore.isTabletMode,
        isLoadingExternalLink: state.homeStore.isLoadingExternalLink,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onResizeViewport: (width, height, isTabletMode) => {
            dispatch(changeViewportDimensions(width, height));
            dispatch(setViewMode(isTabletMode));
        },
        onSaveLocation: (nextLocation) => {
            dispatch(saveLocation(nextLocation))
        }
    }
}

export const HomeFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Home);
