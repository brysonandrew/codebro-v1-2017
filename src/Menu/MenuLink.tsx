import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { setTransitionScreen } from '../Home/HomeActionCreators';
import { IPageLink } from "../data/models";
import { pageLinks } from "../data/pages";

interface IProperties {
    width?: number
    height?: number
}

interface ICallbacks {
    onChangeMenuIndex?: (menuIndex: number) => void
    onSetTransitionScreen?: (isScreenUp: boolean) => void
}

interface IProps extends IProperties, ICallbacks {
    index: number
    page: IPageLink
}

interface IState extends IProperties, ICallbacks {
    isHovered?: boolean
    isMounted?: boolean
}

export class MenuLink extends React.Component<IProps, IState> {

    setTimeoutId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false,
            isMounted: false
        }
    }

    componentDidMount() {
        this.setTimeoutId = setTimeout(() => {
            this.setState({isMounted: true})
        }, 0)
    }

    componentWillUnmount() {
        clearTimeout(this.setTimeoutId);
    }

    handleMouseEnter() {
        this.setState({ isHovered: true });
    }

    handleMouseLeave() {
        this.setState({ isHovered: false });
    }

    handleClick() {
        this.props.onSetTransitionScreen(true);
    }

    render(): JSX.Element {
        const { isMounted } = this.state;
        const { index, page, width, height } = this.props;
        const radiansFactor = ((Math.PI * 2) / pageLinks.length);
        const startingIndex = 0;

        const styles = {
            menuLink: {
                position: "absolute",
                left: "50%",
                top: "50%"
            },
            menuLink__text: {
                MozTransform: `scale(${isMounted ? 1 : 0})`,
                MozTransition: "transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                MozTransitionDelay: `${400 * index + 400}ms`,
                transform: `scale(${isMounted ? 1 : 0})`,
                transition: "transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transitionDelay: `${400 * index + 400}ms`
            }
        };
        return (
            <div onClick={() => this.handleClick()}
                 style={ Object.assign( {}, styles.menuLink,
                            {
                                transform : `translate( calc(${Math.sin(radiansFactor * (index + startingIndex)) * width * 0.25}px - 50%),
                                                        calc(${Math.cos(radiansFactor * (index + startingIndex)) * height * 0.25}px - 50%))`
                            }
                        )}>
                <h2 style={styles.menuLink__text}>{page.linkComponent}</h2>
            </div>
        );
    }
}


// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        width: state.homeStore.width,
        height: state.homeStore.height
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onSetTransitionScreen: (isScreenUp) => {
            dispatch(setTransitionScreen(isScreenUp));
        }
    }
}

export let MenuLinkFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(MenuLink);

