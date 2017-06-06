import * as React from 'react';
import {addComponentCSS} from './utils/css_styler';

addComponentCSS({
    //language=CSS
    default: `
    .empty {
    }
    `
});

interface IProps {}

interface IState {}

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
