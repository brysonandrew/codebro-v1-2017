import * as React from 'react';
import THREE = require('three');
import {connect} from 'react-redux';
import {IStoreState} from '../../redux/main_reducer';
import {Logo} from '../../Widgets/Logo/Logo';

interface IProperties {}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {}

export class Workshop extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            workshop: {
                position: "relative",
                width: "100%",
                height: "100vh",
                textAlign: "center"
            },
            workshop__object: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
            }

        };
        return (
            <div style={ styles.workshop }>
                <div style={ styles.workshop__object }>
                    <Logo/>
                </div>
            </div>
        );
    }
}

// ------------ redux mappers -------------


function mapStateToProps(state: IStoreState, ownProps: IProps): IProperties {
    return {
    };

}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
    }
}

export let WorkshopFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(Workshop);
