import * as React from 'react';
import {colors} from "../data/themeOptions";

interface IProps {
    isScreenUp: boolean
    colorKey: string
    index: number
}

interface IState {}

export class PageTransitionScreen extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
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
                style={Object.assign({}, styles.pageTransitionScreen,
                                {
                                    background: colors[colorKey],
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
