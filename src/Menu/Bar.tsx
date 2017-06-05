import * as React from 'react';
import {IBar} from "../data/models";
import {colors} from "../data/themeOptions";

interface IBarProps {
    bar: IBar
    index: number
    barLength: number
    rotateStyle: string
    translateStyle: string
    isBarChartMounted: boolean
}

interface IBarState {
}

export class Bar extends React.Component<IBarProps, IBarState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        let { bar, isBarChartMounted, translateStyle, rotateStyle, barLength } = this.props;

        let styles = {
            bar: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: barLength,
                height: 14,
                background: "rgba(0,0,0, 0.1)",
            },
            bar__quantity: {
                display: "block",
                background: colors.hi,
                height: 14,
                fontSize: 10,
                padding: "0 0 0 10px",
                color: "#fafafa",
                textAlign: "left",
                width: `${bar.quantity}%`,
                transform: `scaleX(${this.props.isBarChartMounted ? 1 : 0}) translateX(${this.props.isBarChartMounted ? "0%" : "-50%"})`,
                transition: "transform 500ms"
            },
            bar__text: {
                position: "absolute",
                top: -4
            }
        } as any;

        return (
            <div style= {Object.assign({}, styles.bar, {transform: `${translateStyle} ${rotateStyle}`}) }>
                <div style={ styles.bar__quantity }>
                    <span style={ styles.bar__text }>
                        {bar.heading}
                    </span>
                </div>
            </div>
        );
    }
}
