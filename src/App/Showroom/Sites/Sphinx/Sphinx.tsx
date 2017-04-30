import * as React from 'react';
import { addComponentCSS } from '../../../../utils/css_styler';
import { SphinxMenuFromStore } from "./Widgets/SphinxMenu/SphinxMenu";
import { colors } from "./sphinxData/themeOptions";
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { setViewportDimensions, setPageIndex, setViewIndex, openMenu } from './SphinxActionCreators';

addComponentCSS({
    //language=CSS
    default: `
        @font-face {
            font-family: Copperplate;
            /*noinspection CssUnknownTarget*/src: url(/fonts/Showroom/Copperplate.ttf);
        }
        @font-face {
            font-family: Balthazar;
            /*noinspection CssUnknownTarget*/src: url(/fonts/Showroom/Balthazar-Regular.ttf);
        }
        .sphinxContainer * {
            font-family: Copperplate, 'arial', sans-serif;
        }
        .sphinxContainer div {
            font-family: Balthazar, 'arial', sans-serif;
        }
        
    `
});

interface IProperties {
    width?: number
    height?: number
    activePageIndex?: number
    isMenuOpen?: boolean
}

interface ICallbacks {
    onResizeViewport?: (width: number, height: number, isMenuOpen: boolean) => void
    onLoad?: (isMenuOpen: boolean) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
}

export class Sphinx extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
        }
    }

    componentDidMount() {
        this.timerId = setTimeout(() => {
            this.setState({
                isMounted: true
            })
        }, 0);
        window.addEventListener("resize", () => this.handleWindowResize());
        this.handleWindowResize();
        this.props.onLoad(window.innerWidth < 600);
    }

    componentWillUnmount() {
        this.timerId = this.setState({
            isMounted: false
        });
        clearTimeout(this.timerId);
    }

    handleWindowResize() {
        this.props.onResizeViewport(
            window.innerWidth,
            window.innerHeight,
            window.innerWidth < 600
        );
    }

    render(): JSX.Element {
        const { isMounted } = this.state;
        const { isMenuOpen } = this.props;

        const imageURL = "https://upload.wikimedia.org/wikipedia/commons/7/75/The_Great_Pyramid_and_the_Sphinx.jpg";

        const styles = {
            sphinx: {
                background: "#fafafa",
                width: "100vw",
                height: "100vh",
            },
            sphinx__outer: {
                background: "#fafafa",
                width: "100vw",
                height: "100vh",
                textAlign: "center",
                opacity: isMounted ? 1 : 0,
                overflow: "scroll",
                transition: "opacity 1000ms"
            },
            sphinx__inner: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "100%",
                height: "100%",
                opacity: isMenuOpen ? 0 : 1,
                background: `radial-gradient(rgba(250,250,250, 0.85) 0%, 
                                             rgba(250,250,250, 0.45) 50%, 
                                             rgba(250,250,250, 0.85) 100%), url(${imageURL})`,
                backgroundSize: "cover",
                filter: "grayscale(100%)",
                transform: "translate(-50%, -50%)",
                transition: "opacity 1000ms"
            },
            sphinx__heading: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                color: "#212121",
                padding: "10px 0",
                borderTop: "2px solid #212121",
                borderBottom: "2px solid #212121",
            }
        };
        return (
            <div style={styles.sphinx}>
                <div style={styles.sphinx__outer}>
                    <SphinxMenuFromStore/>
                    <div style={styles.sphinx__inner}>
                        <h1 style={ styles.sphinx__heading }>
                            Sphinx
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.sphinxStore.width,
        isMenuOpen: state.sphinxStore.isMenuOpen,
        activePageIndex: state.sphinxStore.activePageIndex
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onLoad: (isMenuOpen) => {
            dispatch(openMenu(isMenuOpen));
        },
        onResizeViewport: (width, height, isMenuOpen) => {
            dispatch(setViewportDimensions(width, height));
            dispatch(openMenu(isMenuOpen));
        }
    }
}

export let SphinxFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Sphinx);
