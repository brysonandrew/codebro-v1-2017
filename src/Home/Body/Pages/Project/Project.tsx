import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../redux/main_reducer';
import { IParams, IProject } from "../../../../data/models";
import { ProjectHeading } from "./ProjectHeading";

interface IProperties {
    isMenuOpen?: boolean
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    docScroll?: number
    savedParams?: IParams
}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {
    index: number
    project: IProject
    docScroll?: number
    offsetTop?: number
}

interface IState extends IProperties, ICallbacks {}

export class Project extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {};
    }

    render(): JSX.Element {
        const { isMobile, isTablet, isLaptop, project, index, savedParams } = this.props;
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
                WebkitFilter: `grayscale(${isActive ? 0 : 100}%)`,
                MozFilter: `grayscale(${isActive ? 0 : 100}%)`,
                filter: `grayscale(${isActive ? 0 : 100}%)`,
                opacity: isActive ? 1 : 0.2,
                transition: "opacity 400ms, filter 400ms"
            },
            project__inner: {
                position: "absolute",
                top: "100%"
            }
        } as any;

        return (
            <div style={ styles.project }>
                <img style={ styles.project__image }
                     src={`/images/${index}.PNG`}/>
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
        isMenuOpen: state.homeStore.isMenuOpen,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {}
}

export const ProjectFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Project);
