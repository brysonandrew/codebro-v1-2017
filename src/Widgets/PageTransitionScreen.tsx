import * as React from 'react';
import {colors} from "../data/themeOptions";

interface IProps {
    isScreenUp: boolean
    colorKey: string
    index: number
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
        const { isScreenUp, colorKey, index } = this.props;
        const styles = {
            pageTransitionScreen: {
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100vh"
            }
        };
        return (
            <div
                onTransitionEnd={() => this.handleTransitionEnd()}
                style={Object.assign({}, styles.pageTransitionScreen,
                                {
                                    background: colors[colorKey],
                                    MozTransform: `scaleY(${isScreenUp ? 1 : 0})`,
                                    MozTransition: "transform 600ms",
                                    MozTransitionDelay: `${400 * index}ms`,
                                    transform: `scaleY(${isScreenUp ? 1 : 0})`,
                                    transition: "transform 600ms",
                                    transitionDelay: `${400 * index}ms`,
                                    zIndex: isScreenUp ? (index + 4) : (4 - index)
                                })
                }
            />
        );
    }
}
