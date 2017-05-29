import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import {changePageIndex, setTransitionScreen} from '../Home/HomeActionCreators';
import { pageLinks } from '../data/pages';
import { Centerpiece } from "./Centerpiece";
import { MenuLinkFromStore } from "./MenuLink";

interface IProperties {
    activePageIndex?: number
    width?: number
    height?: number
    isScreenTransitionFinished?: boolean
}

interface ICallbacks {
    onChangeMenuIndex?: (menuIndex: number) => void
    onSetTransitionScreen?: (isScreenUp: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHoverSwitched?: boolean
}

export class Menu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHoverSwitched: false
        }
    }

    render(): JSX.Element {

        let styles = {
            menu: {
                position: "relative",
            }
        };

        return (
            <div style={styles.menu}>
                <Centerpiece/>
                <div>
                    {pageLinks.map((page, i) =>
                        <MenuLinkFromStore
                            key={i}
                            index={i}
                            page={page}
                            isScreenTransitionFinished={this.props.isScreenTransitionFinished}
                        />
                    )}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        activePageIndex: state.homeStore.activePageIndex,
        width: state.homeStore.width,
        height: state.homeStore.height
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onChangeMenuIndex: (activePageIndex) => {
            dispatch(changePageIndex(activePageIndex));
        },
        onSetTransitionScreen: (isScreenUp) => {
            dispatch(setTransitionScreen(isScreenUp));
        }
    }
}

export let MenuFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Menu);
