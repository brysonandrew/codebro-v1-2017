import * as React from 'react';
import {colors} from "../../data/themeOptions";

interface IProps {
    screenKey: string
    screenIndex: number
    isScreenUp: boolean
    onTransitionEnd: () => void
}

interface IState {}

export class PageTransitionScreen extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    handleTransitionEnd() {
        this.props.onTransitionEnd();
    }

    render(): JSX.Element {
        const { isScreenUp, screenKey, screenIndex } = this.props;
        const styles = {
            pageTransitionScreen: {
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "200%",
                border: "4px solid blue",
                height: "100vh",
                background: colors[screenKey],
                MozTransform: `scaleX(${isScreenUp ? 1 : 0})`,
                MozTransition: "transform 600ms",
                MozTransitionDelay: `${400 * screenIndex}ms`,
                transform: `scaleX(${isScreenUp ? 1 : 0})`,
                transition: "transform 600ms",
                transitionDelay: `${400 * screenIndex}ms`,
                zIndex: isScreenUp ? (screenIndex + 4) : (4 - screenIndex)
            }
        } as any;
        return (
            <div style={styles.pageTransitionScreen}
                 onTransitionEnd={() => this.handleTransitionEnd()}
            />

        );
    }
}
