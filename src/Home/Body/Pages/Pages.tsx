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

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { history, savedParams } = this.props;
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
