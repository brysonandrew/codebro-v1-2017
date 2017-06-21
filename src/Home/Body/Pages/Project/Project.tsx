import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { IParams, IProject } from "../../../../data/models";
import { ProjectHeading } from "./ProjectHeading";
import {toParams} from "../../../../data/helpers/toParams";
import {saveParams, toggleScrollAnimation} from "../../../HomeActionCreators";
import {Link} from "react-router-dom";

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
    isProjectExtended?: boolean
    posY?: number
}

export class Project extends React.Component<IProps, IState> {

    innerRef;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isProjectExtended: false,
            posY: 0
        };
    }

    handleClick() {
        this.props.onAnimationStart(toParams(`/${this.props.project.path}`));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.savedParams.activePagePath !== nextProps.savedParams.activePagePath) {
            this.setState({ //reset
                isHovered: false,
                isProjectExtended: false,
                posY: 0
            })
        }
    }

    handleHeadingClick() {
        this.props.onAnimationStart(toParams(`/${this.props.project.path}`));
        this.setState({
            isProjectExtended: true
        })
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

    handleWheel(e) {
        const { posY } = this.state;
        const { project } = this.props;

        const delta = e.deltaY;
        const imageNumber = project.imagePaths.length;
        const imageHeight = this.innerRef.clientHeight / imageNumber;
        const scrollHeight = imageHeight * (imageNumber - 1);

        const isMin = posY > 0;
        const isMax = posY < -scrollHeight;

        if (delta > 10 && !isMin) {
            this.setState({
                posY: posY + 10
            })
        } else if (delta < 10 && !isMax) {
            this.setState({
                posY: posY - 10
            })
        }

        e.stopPropagation();
        e.preventDefault();
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, project, index, savedParams, height, previewWidth } = this.props;
        const { isHovered, isProjectExtended, posY } = this.state;
        const isActive = project.path===savedParams.activePagePath || (!savedParams.activePagePath && index===0);
        const styles = {
            project: {
                position: "relative",
                display: "table-cell",
                height: height,
                verticalAlign: "middle",
                width: "100%",
                zIndex: isProjectExtended ? 6666 : 0
            },
            project__inner: {
                display: "inline-block",
                transform: `translate3d(0px, ${posY}px, 0px)`
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
                cursor: isProjectExtended ? "default" : "pointer"
            },
            project__heading: {
                width: "100%",
                opacity: isActive ? 1 : isHovered ? 0.6 : 0.2,
                transition: "opacity 800ms",
            }
        } as any;

        return (
            <Link style={ styles.project }
                  to={`/${this.props.project.path}`}
                  onWheel={isProjectExtended ? (e) => this.handleWheel(e) : null}
                  onClick={isActive ? e => e.preventDefault() : () => this.handleClick()}>
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
                    && <div style={ styles.project__heading}>
                        <ProjectHeading
                            project={project}
                            previewWidth={previewWidth}
                            isMobile={isMobile}
                            isTablet={isTablet}
                            isLaptop={isLaptop}
                            isActive={isActive}
                            onClick={this.handleHeadingClick.bind(this)}
                        />
                    </div>}
                </div>
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
        }
    }
}

export const ProjectFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Project);
