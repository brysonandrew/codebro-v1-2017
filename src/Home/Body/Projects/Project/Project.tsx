import * as React from 'react';
import * as history from 'history';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { IParams, IProject } from "../../../../data/models";
import { ProjectHeading } from "./Heading/ProjectHeading";
import { toParams } from "../../../../data/helpers/toParams";
import { saveParams, togglePreview, toggleScrollAnimation } from "../../../HomeActionCreators";
import { Link } from "react-router-dom";
import { colors } from "../../../../data/themeOptions";
import { Loader } from "../../../../Widgets/Loader";
import { ImageLoader } from "../../../../Widgets/ImageLoader";
import {ProjectLink} from "./Link/ProjectLink";

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
    history: history.History
    previewWidth?: number
    docScroll?: number
    offsetTop?: number
}

interface IState extends IProperties, ICallbacks {
    isHovered?: boolean
    isHeadingHovered?: boolean
    isProjectExtended?: boolean
    posY?: number
    isImagesLoading?: boolean
}

export class Project extends React.Component<IProps, IState> {

    animationFrameId;
    timeoutId;
    innerRef;
    scrollHeight = 1; // make one so it doesnt return NAN on division
    elasticBuffer = 140;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isHeadingHovered: false,
            isProjectExtended: false,
            isImagesLoading: false,
            posY: 0,
        };
        this.handleHeadingClick = this.handleHeadingClick.bind(this);
        this.handleRelease = this.handleRelease.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { savedParams } = this.props;
        const isParamsChanged = (savedParams.activeProjectPath !== nextProps.savedParams.activeProjectPath);
        if (isParamsChanged && savedParams.activeProjectPath)  {
            this.setState({ //reset
                isHovered: false,
                isHeadingHovered: false,
                isProjectExtended: false,
                posY: 0
            });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
        cancelAnimationFrame(this.animationFrameId);
    }

    handleClick() {
        const path = `/${this.props.project.path}`;
        this.props.history.push(path);
        this.props.onAnimationStart(toParams(path));
    }

    handleHeadingClick() {
        const { project, onAnimationStart, onExtendPreview, history } = this.props;
        const { isProjectExtended } = this.state;

        if (isProjectExtended) {
            this.setState({
                isProjectExtended: false,
                posY: 0
            });
        } else {
            this.setState({
                isProjectExtended: true,
                isImagesLoading: true
            });

            onAnimationStart(toParams(`/${project.path}`));
            onExtendPreview();
        }
        history.push(`/${this.props.project.path}`);
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

    handleRelease() {
        const { posY } = this.state;
        const spring = 0.4;
        const friction = 0.2;
        const isMin = posY > 0;
        const isMax = posY < -this.scrollHeight;

        this.animationFrameId = requestAnimationFrame(this.handleRelease);

        if (isMin) {
            if (posY < 50) {
                cancelAnimationFrame(this.animationFrameId);
            }

            let recoil = (posY - this.elasticBuffer) * spring;

            recoil *= friction;

            const nextPosY = posY + recoil;

            this.setState({
                posY: nextPosY
            });

            return nextPosY;
        } else if (isMax) {

            if (posY > -this.scrollHeight) {
                cancelAnimationFrame(this.animationFrameId);
            }

            let recoil = ((this.scrollHeight + this.elasticBuffer) + posY) * spring;

            recoil *= friction;

            const nextPosY = posY + recoil;

            this.setState({
                posY: nextPosY
            });

            return nextPosY;
        } else {
            cancelAnimationFrame(this.animationFrameId);

            this.setState({
                posY: posY
            });

            return posY;
        }
    }

    handleWheel(e) {
        const { posY } = this.state;

        const delta = e.deltaY;
        const easing = 0.15;

        const imageNumber = this.props.project.imagePaths.length;
        this.scrollHeight = (this.innerRef.clientHeight / imageNumber) * (imageNumber - 1);

        const isMin = posY > 0;
        const isMax = posY < -this.scrollHeight;
        const isUp = (delta > 1);
        const isDown = (delta < -1);

        const nextPosY = isDown
                            ?   isMin
                                    ?   posY + (this.elasticBuffer - posY) * easing
                                    :   posY + 28
                            :   isUp
                                    ?   isMax
                                            ?   posY - ((this.scrollHeight + this.elasticBuffer) + posY) * easing
                                            :   posY - 28
                                    :   this.handleRelease();

        this.setState({
            posY: nextPosY
        });

        //detect wheel stop
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => this.handleRelease(), 140);

        e.stopPropagation();
        e.preventDefault();
    }

    handleLoad() {
        this.setState({
            isImagesLoading: false
        });
    }

    handleFail() {
        this.setState({
            isImagesLoading: false
        });
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, project, index, savedParams, height, previewWidth, onCondensePreview } = this.props;
        const { isHovered, isHeadingHovered, isProjectExtended, posY, isImagesLoading } = this.state;
        const isActive = project.path===savedParams.activeProjectPath
                            || (!savedParams.activeProjectPath && index===0);

        const heightByScroll = ((height + this.elasticBuffer) / this.scrollHeight * (-posY - this.elasticBuffer));

        const topOffset = isMobile ? 200 : isTablet ? 150 : 100;

        const styles = {
            project: {
                position: "relative",
                height: height,
                width: "100%"
            },
            project__bar: {
                position: "absolute",
                top: 0,
                right: -2,
                width: 2,
                height: (isActive && heightByScroll > 0) ? heightByScroll : 0,
                background: colors.std
            },
            project__inner: {
                position: "relative",
                top: `${isProjectExtended ? 0 : 50}%`,
                paddingTop: isProjectExtended ? 0 : topOffset,
                transform: `translate3d(0px, ${posY}px, 0px) translate(0px, ${posY}px) translate(0px, ${isProjectExtended ? 0 : -50}%)`,
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
            <div style={ styles.project }
                  onWheel={isProjectExtended
                            ?   isImagesLoading
                            ?   e => e.preventDefault()
                                :   (e) => this.handleWheel(e)
                                :   null}
                  onClick={isActive ? this.handleHeadingClick : this.handleClick}>
                <div style={ styles.project__inner }
                     ref={el => this.innerRef = el}
                     onMouseEnter={isActive ? null : () => this.handleMouseEnter()}
                     onMouseLeave={isActive ? null : () => this.handleMouseLeave()}
                     onTransitionEnd={isProjectExtended || !isActive
                                        ?   null
                                        :   onCondensePreview}>
                    {project.imagePaths.map((path, i) =>
                        ((isProjectExtended && !isImagesLoading)
                        || i === 0)
                            &&
                        <img key={i}
                             style={ styles.project__image }
                             src={path}/>
                    )}
                    {isProjectExtended
                    && isImagesLoading
                    &&
                    <div>
                        <ImageLoader
                            imagePaths={project.imagePaths}
                            onLoad={() => this.handleLoad()}
                            onFail={() => this.handleFail()}
                        />
                        <Loader/>
                    </div>}
                    {isProjectExtended
                        ?   <div>
                                <ProjectLink
                                    project={project}
                                    isMobile={isMobile}
                                    isTablet={isTablet}
                                    isLaptop={isLaptop}
                                />
                            </div>
                        :   <div style={ styles.project__heading}
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
                                    onClick={this.handleHeadingClick}
                                />
                            </div>}
                </div>
                <div style={ styles.project__bar} />
            </div>
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
