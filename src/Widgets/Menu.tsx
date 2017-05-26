import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { changePageIndex } from '../Home/HomeActionCreators';
import { pages } from '../data/pages';
import { browserHistory, Link } from 'react-router';
import { Word } from './Logo/Word';

interface IProperties {
    activePageIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onChangeMenuIndex?: (menuIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    hoveringIndex?: number
    isHoverSwitched?: boolean
}

export class Menu extends React.Component<IProps, IState> {

    menuItems = pages.filter((item, index) => item.componentType === "post");

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            hoveringIndex: -1,
            isHoverSwitched: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({isMounted: true})
        }, 0)
    }

    handleOpenClick(i, path) {
        browserHistory.push(path);
        this.props.onChangeMenuIndex(i);
    }

    handleCloseClick() {
        browserHistory.push("");
        this.props.onChangeMenuIndex(-1);
    }

    handleMouseEnter(i) {
        this.setState({hoveringIndex: i});
    }

    handleMouseLeave() {
        this.setState({
            hoveringIndex: -1
        });
    }

    render(): JSX.Element {
        let { hoveringIndex, isMounted } = this.state;
        let { activePageIndex, width } = this.props;

        let lineAboveTransforms = [
            ((activePageIndex > -1)   //blogPosts
                ? `translate3d(${width * 1.25}px,0px,0px)`      //menuactive
                : `translate3d(${width * 0.25}px,0px,0px)`),    //frontpage
            ((activePageIndex > -1)   //work
                ? `translate3d(${width * 1.25}px,0px,0px)`      //menuactive
                : `translate3d(${width * 0.75}px,0px,0px)`),    //frontpage
            ((activePageIndex > -1)   //blogPosts
                ? `translate3d(${width * 1.25}px,0px,0px)`      //menuactive
                : `translate3d(${width * 0.50}px,0px,0px)`),    //frontpage
        ];

        let lineBelowTransforms = [
            ((activePageIndex > -1)   //blogPosts
                ? `translate3d(${-width * 0.75}px,0px,0px)`      //menuactive
                : `translate3d(${-width * 0.75}px,0px,0px)`),    //frontpage
            ((activePageIndex > -1)   //work
                ? `translate3d(${-width * 0.75}px,0px,0px)`      //menuactive
                : `translate3d(${-width * 0.25}px,0px,0px)`),    //frontpage
            ((activePageIndex > -1)   //work
                ? `translate3d(${-width * 0.75}px,0px,0px)`      //menuactive
                : `translate3d(${-width * 0.5}px,0px,0px)`)      //frontpage
        ];

        let styles = {
            menu: {
                position: "absolute",
                width: "100%",
                top: (activePageIndex > -1) ? "8%" : "50%",
                transform: "translateY(-50%)",
                overflow: "hidden",
                transition: "top 400ms"
            },
            menu_selector: {
                background: "none",
                border: "none",
                outline: "none",
                textDecoration: "none",
                position: "relative",
                display: "inline-block",
                padding: "6px 0",
                verticalAlign: "top",
                textAlign: "center",
                width: 100 / this.menuItems.length + "%",
                fontSize: 40,
                color: "#ffffff",
                transform: isMounted ? "translate3d(0px,0px,0px)" : "translate3d(0px,80px,0px)",
                transition: "all 400ms",
                cursor: "pointer"
            },
            menu_lineAbove: {
                position: "absolute",
                width: (activePageIndex > -1) ? "50%" : "100%",
                left: "-100%",
                height: 2,
                background: "#ffffff",
                top: 0,
                WebkitTransform: (hoveringIndex > -1)
                    ? lineAboveTransforms[hoveringIndex]
                    : "translate3d(0px,0px,0px)",
                transform: (hoveringIndex > -1)
                    ? lineAboveTransforms[hoveringIndex]
                    : "translate3d(0px,0px,0px)",
                transition: "transform 400ms"
            },
            menu_lineBelow: {
                position: "absolute",
                width: (activePageIndex > -1) ? "50%" : "100%",
                left: "100%",
                height: 2,
                background: "#ffffff",
                bottom: 0,
                WebkitTransform: (hoveringIndex > -1)
                    ? lineBelowTransforms[hoveringIndex]
                    : "translate3d(0px,0px,0px)",
                transform: (hoveringIndex > -1)
                    ? lineBelowTransforms[hoveringIndex]
                    : "translate3d(0px,0px,0px)",
                transition: "transform 400ms"
            },
            menu_cross: {
                position: "absolute",
                right: "calc(2vw - 20px)",
                top: "50%",
                opacity: (hoveringIndex > -1) ? 1 : 0.5,
                width: 40,
                height: "100%",
                transform: "translateY(-25%)"
            },
            menu_crossArm1: {
                position: "absolute",
                background: "#ffffff",
                height: "50%",
                width: 3,
                transform: (hoveringIndex > -1) ? "rotate(90deg)" : "rotate(45deg)",
                transition: "transform 200ms"
            },
            menu_crossArm2: {
                position: "absolute",
                background: "#ffffff",
                height: "50%",
                width: 3,
                transform: (hoveringIndex > -1) ? "rotate(90deg)" : "rotate(-45deg)",
                transition: "transform 200ms"
            },
            menu__name: {
                display: "inline-block",
            },
            menu__nameOrigin: {
                fontFamily: "PlayfairRegular, 'arial', sans-serif",
                transition: "opacity 200ms"
            },
            menu__nameTransform: {
                position: "absolute",
                top: "12.5%",
                transition: "opacity 200ms"
            }
        };
        return (
            <div style={styles.menu}>
                <div style={styles.menu_lineAbove}></div>
                {this.menuItems.map((section, i) =>
                    <Link   key={i}
                            to={(activePageIndex > -1) ? "" : section.path}
                            style={Object.assign({},
                            styles.menu_selector,
                                { opacity: (activePageIndex > -1)
                                    ? ((activePageIndex===i) ? 1 : 0)
                                    : 1},
                                { width: (activePageIndex > -1)
                                    ? ((activePageIndex===i) ? "100%" : "0")
                                    : "50%"})}
                             onClick={(activePageIndex > -1)
                                ? (() => this.handleCloseClick())
                                : (() => this.handleOpenClick(i, section.path))}
                             onMouseEnter={() => this.handleMouseEnter(i)}
                             onMouseLeave={() => this.handleMouseLeave()}
                    >
                        <div style={ styles.menu__name }>
                            <span style={Object.assign({}, styles.menu__nameOrigin,
                                                            {opacity: hoveringIndex===i ? 0 : 1})}>
                                {section.name}
                            </span>
                            <div style={ Object.assign({}, styles.menu__nameTransform,
                                                           {opacity: hoveringIndex===i ? 1 : 0})}>
                                <Word
                                    word={section.name}
                                    isLogoHovered={hoveringIndex===i}
                                />
                            </div>
                        </div>
                        {(activePageIndex > -1)
                            ?   <div style={styles.menu_cross}>
                                    <div style={styles.menu_crossArm1}></div>
                                    <div style={styles.menu_crossArm2}></div>
                                </div>
                            :   null}
                    </Link>
                )}
                <div style={styles.menu_lineBelow}/>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        activePageIndex: state.homeStore.activePageIndex,
        width: state.homeStore.width,
        height: state.homeStore.height
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onChangeMenuIndex: (activePageIndex) => {
            dispatch(changePageIndex(activePageIndex));
        }
    }
}

export let MenuFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Menu);
