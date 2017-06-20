import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../redux/main_reducer';
import { MenuFull } from "./MenuFull/MenuFull";
import { MenuTablet } from "./MenuTablet/MenuTablet";

interface IProperties {
    isMenuOpen?: boolean
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
}

interface ICallbacks {
}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {
    isMounted?: boolean
}

export class Menu extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    componentDidMount() {}

    render(): JSX.Element {
        const { isMenuOpen, isMobile, isTablet, isLaptop } = this.props;

        const styles = {
            menu: {
                position: "fixed",
                right: 20,
                top: 28,
                zIndex: 10
            }
        } as any;
        return (
            <div style={ styles.menu }>
                {isTablet
                    ?   <MenuTablet
                            isMenuOpen={isMenuOpen}
                            isMobile={isMobile}
                            isLaptop={isLaptop}
                        />
                    :   <MenuFull
                            isMobile={isMobile}
                            isLaptop={isLaptop}
                        />}

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
        isLaptop: state.homeStore.isLaptop
    }
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {}
}

export let MenuFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Menu);
