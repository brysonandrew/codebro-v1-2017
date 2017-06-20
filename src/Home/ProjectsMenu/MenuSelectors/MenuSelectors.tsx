import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../redux/main_reducer';
import { MenuSelector } from "./MenuSelector";
import { saveParams, toggleMenu, toggleScrollAnimation } from "../../HomeActionCreators";
import { toParams } from "../../../data/helpers/toParams";
import { projectList } from '../../../data/content';
import { IParams } from "../../../data/models";
import { colors } from "../../../data/themeOptions";

interface IProperties {
    isMenuOpen?: boolean
    isTablet?: boolean
    isWheel?: boolean
    savedParams?: IParams
}

interface ICallbacks {
    onAnimationStart?: (nextParams: IParams) => void
    onCloseMenu?: () => void
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
}

export class MenuSelectors extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleSelectorClick(nextPath) {
        if (this.props.isTablet && this.props.isMenuOpen) {
            this.props.onCloseMenu();
        }
        this.props.onAnimationStart(toParams(nextPath));
    }

    render(): JSX.Element {
        const { isMenuOpen, isTablet, savedParams, isWheel } = this.props;

        const styles = {
            menuSelectors: {
                display: "inline-block"
            }
        };

        return (
            <div style={ styles.menuSelectors }>
                {projectList.map((content, i) =>
                    <MenuSelector
                        key={i}
                        isMenuOpen={isMenuOpen}
                        isWheel={isWheel}
                        isTablet={isTablet}
                        selectorIndex={i}
                        content={content}
                        savedParams={savedParams}
                        onClick={this.handleSelectorClick.bind(this)}
                    />)}
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        isMenuOpen: state.homeStore.isMenuOpen,
        isWheel: state.homeStore.isWheel,
        isTablet: state.homeStore.isTablet,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onAnimationStart: (nextParams) => {
            dispatch(toggleScrollAnimation(true));
            dispatch(saveParams(nextParams));
        },
        onCloseMenu: () => {
            dispatch(toggleMenu(false));
        }
    }
}

export let MenuSelectorsFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(MenuSelectors);
