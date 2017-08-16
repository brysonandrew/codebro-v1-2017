import * as React from 'react';
import * as Immutable from 'immutable';
import * as history from 'history';
import { connect } from 'react-redux';
import { IParams } from '../../../data/models';
import { IStoreState } from '../../../redux/main_reducer';
import { labProjectList, labProjects } from '../../../data/content';
import { toParams } from '../../../data/helpers/toParams';
import { saveParams } from '../../HomeActionCreators';

interface IProperties {
    savedParams?: IParams
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    width?: number
    height?: number
}

interface ICallbacks {
    onLocationListen?: (nextParams: IParams) => void
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
    }

    componentDidMount() {
        const{ onLocationListen } = this.props;


        this.props.history.listen( location =>  {
            onLocationListen(toParams(location.pathname));
        });

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
        })

    }

    handlePagesMenuClick(i) {
        const pagePath = labProjectList[i].path;
        this.props.history.push(`/${pagePath}`);
    }

    render(): JSX.Element {
        const { savedParams, history } = this.props;
        const { keysPressed, my, mx, isMounted } = this.state;
        const styles = {
            pages: {
                position: 'relative'
            },
            pages__menu: {
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: isMounted ? 1 : 0
            },
            pages__page: {

            }
        } as any;

        const activeProjectPath = savedParams.activeProjectPath;
        const component = labProjects[activeProjectPath ? activeProjectPath : 'intro'].component;

        return (
            <div style={ styles.pages }>
                {/*<div style={ styles.pages__menu }>*/}
                    {/*<MenuFromStore*/}
                        {/*onClick={this.handlePagesMenuClick.bind(this)}*/}
                    {/*/>*/}
                {/*</div>*/}
                <div style={ styles.pages__page }>
                    {React.cloneElement(
                        component,
                        {
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
        onLocationListen: (nextParams) => {
            dispatch(saveParams(nextParams));
        }
    }
}

export const LabFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Lab);
