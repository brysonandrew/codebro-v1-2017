import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { IParams, IProject } from "../../../../data/models";
import { ProjectHeading } from "./ProjectHeading";
import {toParams} from "../../../../data/helpers/toParams";
import {saveParams, togglePreview, toggleScrollAnimation} from "../../../HomeActionCreators";
import {Link} from "react-router-dom";
import {colors} from "../../../../data/themeOptions";

interface IProperties {
    isMenuOpen?: boolean
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    docScroll?: number
    height?: number
    savedParams?: IParams
}

interface ICallbacks {
    onAnimationStart?: (nextParams: IParams) => void
    onExtendPreview?: () => void
    onCondensePreview?: () => void
}

interface IProps extends IProperties, ICallbacks {
    index: number
    project: IProject
    previewWidth?: number
    docScroll?: number
    offsetTop?: number
}

interface IState extends IProperties, ICallbacks {
    isHovered?: boolean
    isHeadingHovered?: boolean
    isProjectExtended?: boolean
    posY?: number
    isMounted?: boolean
}

export class Project extends React.Component<IProps, IState> {

    innerRef;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isHeadingHovered: false,
            isProjectExtended: false,
            posY: 0,
            isMounted: false
        };
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
    }

    componentWillReceiveProps(nextProps) {
        const { savedParams } = this.props;
        if (savedParams.activePagePath !== nextProps.savedParams.activePagePath) {
            this.setState({ //reset
                isHovered: false,
                isHeadingHovered: false,
                isProjectExtended: false,
                posY: 0
            });
            this.props.onCondensePreview();
        }
    }

    handleClick() {
        this.props.onAnimationStart(toParams(`/${this.props.project.path}`));
    }

    handleHeadingClick() {
        const { project, onAnimationStart, onExtendPreview, onCondensePreview } = this.props;
        const { isProjectExtended } = this.state;

        if (isProjectExtended) {
            this.setState({
                isProjectExtended: false,
                posY: 0
            });
            onCondensePreview();
        } else {
            this.setState({
                isProjectExtended: true
            });
            onAnimationStart(toParams(`/${project.path}`));
            onExtendPreview();
        }
    }

    handleMouseEnter() {
        this.setState({
            isHovered: true
        })
    }

    handleMouseLeave() {
        this.setState({
            isHovered: false
        })
    }

    handleHeadingMouseEnter() {
        this.setState({
            isHeadingHovered: true
        })
    }

    handleHeadingMouseLeave() {
        this.setState({
            isHeadingHovered: false
        })
    }

    handleWheel(e) {
        const { posY } = this.state;

        const delta = e.deltaY;

        const isMin = posY > 0;
        const isMax = posY < -this.scrollHeight();

        console.log(delta);

        if (delta < -2 && !isMin) {
            this.setState({
                posY: posY + 40
            })
        }
        if (delta > 2 && !isMax) {
            this.setState({
                posY: posY - 40
            })
        }

        e.stopPropagation();
        e.preventDefault();
    }

    scrollHeight() {
        const imageNumber = this.props.project.imagePaths.length;
        return this.state.isMounted ? (this.innerRef.clientHeight / imageNumber) * (imageNumber - 1) : 1;
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, project, index, savedParams, height, previewWidth } = this.props;
        const { isHovered, isHeadingHovered, isProjectExtended, posY } = this.state;
        const isActive = project.path===savedParams.activePagePath
                            || (!savedParams.activePagePath && index===0);
        const topOffset = isMobile ? 200 : isTablet ? 150 : 100;

        const styles = {
            project: {
                position: "relative",
                display: "table-cell",
                height: height,
                verticalAlign: "top",
                width: "100%"
            },
            project__bar: {
                position: "absolute",
                top: 0,
                right: -2,
                width: 2,
                height: height / this.scrollHeight() * -posY,
                background: colors.std,
                // transition: "height 1000ms"
            },
            project__inner: {
                display: "inline-block",
                paddingTop: isProjectExtended ? 0 : topOffset,
                transform: `translate3d(0px, ${posY}px, 0px)`,
                transition: "padding 800ms"
            },
            project__image: {
                position: "relative",
                width: "calc(100% - 20px)",
                padding: "0px 10px",
                height: "auto",
                WebkitFilter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                MozFilter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                filter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                opacity: isActive ? 1 : isHovered ? 0.6 : 0.2,
                transition: "opacity 800ms, filter 800ms",
                cursor: isProjectExtended ? "default" : "pointer",
            },
            project__heading: {
                padding: "40px 0px 80px",
                width: "100%",
                opacity: isActive ? 1 : isHovered ? 0.6 : 0.2,
                transition: "opacity 800ms",
            }
        } as any;

        return (
            <Link style={ styles.project }
                  to={`/${this.props.project.path}`}
                  onWheel={isProjectExtended ? (e) => this.handleWheel(e) : null}
                  onClick={isActive ? e => {e.preventDefault();this.handleHeadingClick()} : () => this.handleClick()}>
                <div style={ styles.project__inner }
                     ref={el => this.innerRef = el}
                     onMouseEnter={isActive ? null : () => this.handleMouseEnter()}
                     onMouseLeave={isActive ? null : () => this.handleMouseLeave()}>
                    {project.imagePaths.map((path, i) =>
                        (isProjectExtended || i === 0)
                            &&
                            <img key={i}
                                 style={ styles.project__image }
                                 src={path}/>)}
                    {!isProjectExtended
                    && <div style={ styles.project__heading}
                            onMouseEnter={isActive ? () => this.handleHeadingMouseEnter() : null}
                            onMouseLeave={isActive ? () => this.handleHeadingMouseLeave() : null}>
                        <ProjectHeading
                            project={project}
                            previewWidth={previewWidth}
                            isMobile={isMobile}
                            isTablet={isTablet}
                            isLaptop={isLaptop}
                            isActive={isActive}
                            isHovered={isHeadingHovered}
                            onClick={this.handleHeadingClick.bind(this)}
                        />
                    </div>}
                </div>
                <div style={ styles.project__bar} />
            </Link>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        height: state.homeStore.height,
        isMenuOpen: state.homeStore.isMenuOpen,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onAnimationStart: (nextParams) => {
            dispatch(toggleScrollAnimation(true));
            dispatch(saveParams(nextParams));
        },
        onExtendPreview: () => {
            dispatch(togglePreview(true));
        },
        onCondensePreview: () => {
            dispatch(togglePreview(false));
        }
    }
}

export const ProjectFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Project);
