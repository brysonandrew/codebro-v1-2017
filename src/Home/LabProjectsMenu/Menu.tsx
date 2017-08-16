import * as React from 'react';
import { StaggeredMotion, spring } from 'react-motion';
import { labProjectList } from "../../data/content";
import { MenuItem } from "./MenuItem";
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { toggleMenu } from '../HomeActionCreators';
import { MenuButton } from "./MenuButton";
import { IParams } from "../../data/models";
import { colors } from '../../data/themeOptions';

interface IProperties {
    isMenuOpen?: boolean
    savedParams?: IParams
}

interface ICallbacks {
    onMenuOpen?: () => void
    onMenuClose?: () => void
}

interface IProps extends IProperties, ICallbacks {
    onClick: (index: number) => void
}

interface IState extends IProperties, ICallbacks {}

export class Menu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isMenuOpen, onMenuOpen, onMenuClose, savedParams } = this.props;

        const styles = {
            pagesMenu: {
                textAlign: "left",
                background: colors.hi
            },
            pagesMenu__items: {
                display: "block",
                verticalAlign: "top"
            }
        };

        const widthStyle = isMenuOpen ? 220 : 40;

        const opacityStyle = isMenuOpen ? 1 : 0;

        return (
            <div style={styles.pagesMenu}>
                <MenuButton
                    isACross={isMenuOpen}
                    onClick={isMenuOpen ? onMenuClose : onMenuOpen}
                />
                <div style={styles.pagesMenu__items}>
                    {labProjectList.map((content, i) =>
                        <div key={i}
                             style={{width: widthStyle}}>
                            <MenuItem
                                index={i}
                                textOpacity={opacityStyle}
                                savedParams={savedParams}
                                isMenuOpen={isMenuOpen}
                                content={content}
                                onClick={this.props.onClick}
                            />
                        </div>)}
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------

function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
        isMenuOpen: state.homeStore.isMenuOpen,
        savedParams: state.homeStore.savedParams
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onMenuOpen: () => {
            dispatch(toggleMenu(true));
        },
        onMenuClose: () => {
            dispatch(toggleMenu(false));
        }
    }
}

export const MenuFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Menu);
