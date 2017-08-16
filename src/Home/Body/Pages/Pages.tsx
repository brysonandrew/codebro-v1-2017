import * as React from 'react';
import * as history from 'history';
import { pages } from '../../../data/content';
import { IParams } from '../../../data/models';

interface IProps {
    history: history.History
    savedParams: IParams
}

interface IState {}

export class Pages extends React.Component<IProps, IState> {

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
        const { history, savedParams } = this.props;
        const styles = {} as any;
        const currentPagePath = !!savedParams.activePagePath
                                    ?   savedParams.activePagePath
                                    :   "portfolio";
        return (
            <div>
                {React.cloneElement(
                    pages[currentPagePath].component,
                    {
                        history: history
                    }
                )}
            </div>
        );
    }
}
