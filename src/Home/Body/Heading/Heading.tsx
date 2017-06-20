import * as React from 'react';

interface IProps {}

interface IState {}

export class Heading extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            heading: {
                width: "calc(100% - 20px)",
                paddingRight: 20,
                textAlign: "right"
            }
        };
        return (
            <div style={ styles.heading }>
                <h2>code bro</h2>
                <pre>F R E E L A N C E  W E B  D E V E L O P E R</pre>
            </div>
        );
    }
}
