import * as React from 'react';
import { colors } from "../../data/themeOptions";
import { PageTransitionScreen } from "./PageTransitionScreen";

interface IProps {
    isScreenUp: boolean
    onTransitionEnd: () => void
}

interface IState {}

export class PageTransitionScreens extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const { isScreenUp } = this.props;
        const screenColors = isScreenUp
            ?   Object.keys(colors).slice(0,2)
            :   Object.keys(colors).slice(0,2).reverse();
        const styles = {
            pageTransitionScreens: {
                border: "4px solid red"
            }
        } as any;

        return (
            <div style={styles.pageTransitionScreens}>
                {screenColors.map((key, i) =>
                   <PageTransitionScreen
                        key={i}
                        screenIndex={i}
                        screenKey={key}
                        isScreenUp={isScreenUp}
                        onTransitionEnd={this.props.onTransitionEnd}
                   />
                )}
            </div>

        );
    }
}
