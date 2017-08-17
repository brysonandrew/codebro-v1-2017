import * as React from 'react';
import * as Immutable from 'immutable';
import * as history from 'history';
import { connect } from 'react-redux';
import { IParams } from '../../../data/models';
import { IStoreState } from '../../../redux/main_reducer';
import { labProjectList, labProjects } from '../../../data/content';
import { toParams } from '../../../data/helpers/toParams';
import { saveParams, togglePreview } from '../../HomeActionCreators';
import { MenuFromStore } from '../../Menu/LabProjectsMenu/Menu';

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
        this.handlePagesMenuClick = this.handlePagesMenuClick.bind(this);
    }

    componentDidMount() {
        const { onExtendPreview, onCondensePreview, savedParams } = this.props;

        this.timeoutId = setTimeout(() => this.setState({ isMounted: true }), 0);

        const isIntro = !savedParams || savedParams.activeProjectPath === 'intro';

        // if (isIntro) {
        //     onCondensePreview();
        // } else {
        //     onExtendPreview();
        // }

        window.addEventListener('keypress', this.handleKeyPress);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillReceiveProps(nextProps) {
        const { onExtendPreview, onCondensePreview, savedParams } = this.props;

        // if (savedParams.activeProjectPath !== nextProps.savedParams.activeProjectPath
        //     && (nextProps.savedParams.activeProjectPath === "intro" || !nextProps.savedParams.activeProjectPath)) {
        //     onCondensePreview();
        // } else {
        //     onExtendPreview();
        // }
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

    handlePagesMenuClick(i) {
        const projectPath = labProjectList[i].path;
        const path = `/lab/${projectPath}`;
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
            pages: {
                position: 'relative',
                top: 0,
                left: 0,
                width: "100%",
                height: `100vh`
            },
            pages__menu: {
                position: 'absolute',
                top: "2vh",
                left: "2vw",
                zIndex: 4
            },
            pages__page: {
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
            <div style={ styles.pages }
                 ref={el => this.parentEl = el}>
                <div style={ styles.pages__menu }>
                    <MenuFromStore
                        onClick={this.handlePagesMenuClick}
                    />
                </div>
                <div style={ styles.pages__page }>
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
        },
        onExtendPreview: () => {
            dispatch(togglePreview(true));
        },
        onCondensePreview: () => {
            dispatch(togglePreview(false));
        }
    }
}

export const LabFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Lab);
