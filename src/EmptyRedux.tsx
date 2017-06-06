import * as React from 'react';
import {connect} from 'react-redux';
import {addComponentCSS} from './utils/css_styler';
import {IStoreState} from './redux/main_reducer';

addComponentCSS({
    //language=CSS
    default: `
    .main-page__filters {
    }
    `
});

interface IProperties {}

interface ICallbacks {}

interface IProps extends IProperties, ICallbacks {}

interface IState extends IProperties, ICallbacks {}

export class Empty extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {

        };
        return (
            <div>
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

export let EmptyStore = connect(
    mapStateToProps, mapDispatchToProps
)(Empty);
