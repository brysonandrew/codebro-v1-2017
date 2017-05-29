import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { setTransitionScreen } from '../Home/HomeActionCreators';
import { IPageLink } from "../data/models";
import { pageLinks } from "../data/pages";

interface IProperties {
    activePageIndex?: number
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
    isHovered: boolean
}

export class MenuLink extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isHovered: false
        }
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
        const { index, page, width, height } = this.props;
        const radiansFactor = ((Math.PI * 2) / pageLinks.length);
        const startingIndex = 0;
        const menuLinkStyle = {
            position: "absolute",
            left: "50%",
            top: "50%"
        };
        return (
            <div key={index}
                 onClick={() => this.handleClick()}
                 style={ Object.assign( {}, menuLinkStyle,
                            {
                                transform : `translate( calc(${Math.sin(radiansFactor * (index + startingIndex)) * width * 0.25}px - 50%),
                                                        calc(${Math.cos(radiansFactor * (index + startingIndex)) * height * 0.25}px - 50%))`
                            }
                        )}>
                {page.linkComponent}
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

