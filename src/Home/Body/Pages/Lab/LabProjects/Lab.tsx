import * as React from 'react';
import * as Immutable from 'immutable';
import * as history from 'history';
import { connect } from 'react-redux';
import { IParams } from '../../../../../data/models';
import { IStoreState } from '../../../../../redux/main_reducer';
import { labProjectList, labProjects } from '../../../../../data/content';
import { toParams } from '../../../../../data/helpers/toParams';
import { saveParams } from '../../../../HomeActionCreators';
import { MenuFromStore } from '../LabProjectsMenu/Menu';
import { HeadingFromStore } from './Heading/Heading';
import { MenuButton } from '../LabProjectsMenu/MenuButton';

interface IProperties {
    savedParams?: IParams
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    width?: number
    height?: number
}

interface ICallbacks {
    onExtendPreview?: () => void
    onCondensePreview?: () => void
    onProjectSelect?: (nextParams: IParams) => void
}

interface IProps extends IProperties, ICallbacks {
    history: history.History
}

interface IState extends IProperties, ICallbacks {
    keysPressed: string[]
    mx: number
    my: number
    isMounted: boolean
}

export class Lab extends React.Component<IProps, IState> {

    timeoutId;
    parentEl;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            keysPressed: [],
            mx: 0,
            my: 0,
            isMounted: false
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleProjectMenuClick = this.handleProjectMenuClick.bind(this);
        this.handleSubProjectMenuClick = this.handleSubProjectMenuClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    componentDidMount() {
        this.timeoutId = setTimeout(() => this.setState({ isMounted: true }), 0);

        window.addEventListener('keypress', this.handleKeyPress);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {

        clearTimeout(this.timeoutId);

        window.removeEventListener('keypress', this.handleKeyPress);
        window.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleKeyPress(e) {
        const keysPressed = Immutable.List(this.state.keysPressed).push(e.key);

        this.setState({
            keysPressed: (this.state.keysPressed.indexOf(e.key) > -1) ? this.state.keysPressed : keysPressed.toArray()
        });
    }

    handleKeyUp(e) {
        const keysPressedList = Immutable.List(this.state.keysPressed);
        const nextKeysPressedList = keysPressedList.filter(item => !(item===e.key));

        this.setState({
            keysPressed: nextKeysPressedList.toArray()
        });
    }

    handleMouseMove(e) {
        this.setState({
            mx: e.pageX,
            my: e.pageY
        });
    }

    handleProjectMenuClick(i) {
        const projectPath = labProjectList[i].path;
        const path = `/lab/${projectPath}`;
        this.handleParamsChange(path);
    }

    handleSubProjectMenuClick(i) {
        const projectPath = this.props.savedParams.activeProjectPath;
        const subProjectPath = labProjects[projectPath].subComponents[i].path;
        const path = `/lab/${projectPath}/${subProjectPath}`;
        this.handleParamsChange(path);
    }

    handleBackClick() {
        const path = `/lab`;
        this.handleParamsChange(path);
    }

    handleParamsChange(path) {
        const { history, onProjectSelect } = this.props;
        history.push(path);
        onProjectSelect(toParams(path));
    }

    render(): JSX.Element {
        const { savedParams, history } = this.props;
        const { keysPressed, my, mx, isMounted } = this.state;

        const isIntro = savedParams.activeProjectPath === "intro" || !savedParams.activeProjectPath;

        const styles = {
            lab: {
                position: 'relative',
                top: 0,
                left: 0,
                width: "100%",
                height: `100vh`
            },
            lab__heading: {
                position: 'absolute',
                top: 0,
                right: 0,
                width: "100%",
                zIndex: 4
            },
            lab__menu: {
                position: 'absolute',
                top: "2vh",
                left: "2vw",
                zIndex: 4
            },
            lab__back: {
                position: 'absolute',
                top: "2vh",
                right: "2vw",
                zIndex: 4
            },
            lab__page: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }
        } as any;

        const activeProjectPath = savedParams.activeProjectPath;
        const component = labProjects[activeProjectPath ? activeProjectPath : 'intro'].component;

        return (
            <div style={ styles.lab }
                 ref={el => this.parentEl = el}>
                {isIntro
                    ?   <div style={ styles.lab__heading}>
                            <HeadingFromStore
                                history={history}
                            />
                        </div>
                    :   <div>
                            <div style={ styles.lab__menu }>
                                <MenuFromStore
                                    onProjectMenuClick={this.handleProjectMenuClick}
                                    onSubProjectMenuClick={this.handleSubProjectMenuClick}
                                />
                            </div>
                            <div style={ styles.lab__back }
                                 onClick={this.handleBackClick}>
                                back
                                <MenuButton
                                    isACross={true}
                                    onClick={this.handleBackClick}
                                />
                            </div>
                        </div>}
                <div style={ styles.lab__page }>
                    {isMounted
                    &&  React.cloneElement(
                            component,
                            {
                                parentEl: this.parentEl,
                                keysPressed: keysPressed,
                                mx: mx,
                                my: my,
                                history: history
                            }
                        )}
                </div>
            </div>
        );
    }
}
// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        height: state.homeStore.height,
        width: state.homeStore.width,
        isMobile: state.homeStore.isMobile,
        isTablet: state.homeStore.isTablet,
        isLaptop: state.homeStore.isLaptop,
        savedParams: state.homeStore.savedParams
    };
}


function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onProjectSelect: (nextParams: IParams) => {
            dispatch(saveParams(nextParams));
        }
    }
}

export const LabFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Lab);
