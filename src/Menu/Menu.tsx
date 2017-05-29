import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../redux/main_reducer';
import { changePageIndex } from '../Home/HomeActionCreators';
import { pageLinks } from '../data/pages';
import { browserHistory, Link } from 'react-router';
import { Word } from '../Widgets/Logo/Word';
import { ProfileImage } from "./ProfileImage";
import { Centerpiece } from "./Centerpiece";
import { MenuLink } from "./MenuLink";

interface IProperties {
    activePageIndex?: number
    width?: number
    height?: number
}

interface ICallbacks {
    onChangeMenuIndex?: (menuIndex: number) => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
    isHoverSwitched?: boolean
}

export class Menu extends React.Component<IProps, IState> {

    setTimeoutId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isHoverSwitched: false
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

    handleOpenClick(i, path) {
        browserHistory.push(path);
        this.props.onChangeMenuIndex(i);
    }

    handleCloseClick() {
        browserHistory.push("");
        this.props.onChangeMenuIndex(-1);
    }

    render(): JSX.Element {
        let { isMounted } = this.state;
        let { activePageIndex, width, height } = this.props;

        let styles = {
            menu: {
                position: "relative",
            },
            menu__selectors: {
                position: "absolute",
                top: 0,
                left: 0
            },
            menu__selector: {
                position: "absolute",
            }
        };

        return (
            <div style={styles.menu}>
                <Centerpiece/>
                <div>
                    {pageLinks.map((page, i) =>
                        <MenuLink
                            key={i}
                            index={i}
                            page={page}
                            width={width}
                            height={height}
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
        }
    }
}

export let MenuFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Menu);
