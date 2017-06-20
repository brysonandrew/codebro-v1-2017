import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { IParams, IProject } from "../../../../data/models";
import { ProjectHeading } from "./ProjectHeading";
import {toParams} from "../../../../data/helpers/toParams";
import {saveParams, toggleScrollAnimation} from "../../../HomeActionCreators";

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
    docScroll?: number
    offsetTop?: number
}

interface IState extends IProperties, ICallbacks {
    isHovered?: boolean
}

export class Project extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        };
    }

    handleClick() {
        this.props.onAnimationStart(toParams(`/${this.props.project.path}`));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.savedParams.activePagePath !== nextProps.savedParams.activePagePath) {
            this.setState({
                isHovered: false
            })
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

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, project, index, savedParams, height } = this.props;
        const { isHovered } = this.state;
        const isActive = project.path===savedParams.activePagePath || (!savedParams.activePagePath && index===0);

        const styles = {
            project: {
                display: "table",
                height: "100%",
                width: "100%",
            },
            project__image: {
                position: "absolute",
                left: 0,
                top: "50%",
                width: "calc(100% - 20px)",
                padding: "0px 10px",
                height: "auto",
                transform: "translateY(-50%)",
                WebkitFilter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                MozFilter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                filter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                opacity: isActive ? 1 : isHovered ? 0.6 : 0.2,
                transition: "opacity 800ms, filter 800ms",
                cursor: isHovered ? "pointer" : "default"
            },
            project__inner: {
                position: "absolute",
                left: "50%",
                top: height * 0.9,
                WebkitFilter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                MozFilter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                filter: `grayscale(${isActive ? 0 : isHovered ? 20 : 100}%)`,
                opacity: isActive ? 1 : isHovered ? 0.6 : 0.2,
                transition: "opacity 800ms, filter 800ms",
                transform: "translate(-50%, -100%)"
            }
        } as any;

        return (
            <div style={ styles.project }
                 onClick={isActive ? null : () => this.handleClick()}>
                <img style={ styles.project__image }
                     src={`/images/${index}.PNG`}
                     onMouseEnter={isActive ? null : () => this.handleMouseEnter()}
                     onMouseLeave={isActive ? null : () => this.handleMouseLeave()}/>
                <div style={ styles.project__inner }>
                    <ProjectHeading
                        project={project}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isLaptop={isLaptop}
                    />
                </div>
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
        }
    }
}

export const ProjectFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Project);
