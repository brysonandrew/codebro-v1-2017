import * as React from 'react';
import * as history from 'history';
import { connect } from 'react-redux';
import { ProjectsFromStore } from '../PortfolioProjects/Projects';
import { BottomNavigationMenu } from '../../BottomNavigationMenu/BottomNavigationMenu';
import { IParams } from '../../../data/models';
import { saveParams, toggleScrollAnimation } from '../../HomeActionCreators';
import { IStoreState } from '../../../redux/main_reducer';

interface IProperties {
    savedParams?: IParams
    isMobile?: boolean
    isTablet?: boolean
    isLaptop?: boolean
    width?: number
    height?: number
}

interface ICallbacks {
    onArrowNavigate?: (nextParams: IParams) => void
}

interface IProps extends IProperties, ICallbacks {
    history: history.History
}

interface IState extends IProperties, ICallbacks {
    isMounted: boolean
}

export class Portfolio extends React.Component<IProps, IState> {

    timerId;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.timerId = setTimeout(() => this.setState({ isMounted: true }), 0);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render(): JSX.Element {
        const { onArrowNavigate, savedParams, isMobile, isTablet, isLaptop, history  } = this.props;

        const styles = {
            portfolio__projects: {
                position: "relative",
                zIndex: 2
            },
            portfolio__bottomNav: {
                position: "fixed",
                bottom: isTablet ? 0 : 80,
                width: "100%",
                zIndex: 2
            }
        } as any;
        return (
            <div>
                <div style={ styles.portfolio__projects}>
                    <ProjectsFromStore
                        history={history}
                    />
                </div>
                <div style={ styles.portfolio__bottomNav }>
                    <BottomNavigationMenu
                        onArrowNavigation={onArrowNavigate}
                        savedParams={savedParams}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isLaptop={isLaptop}
                    />
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
        onArrowNavigate: (nextParams) => {
            dispatch(saveParams(nextParams));
            dispatch(toggleScrollAnimation(true));
        }
    }
}

export const PortfolioFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Portfolio);
