import * as React from 'react';
import THREE = require('three');
import { addComponentCSS } from '../utils/css_styler';
import { awesomeColors } from '../data/awesomeColors';

addComponentCSS({
    //language=CSS
    default: `
        @keyframes breathe {
            0%   { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `
});

interface IProps {}

interface IState {}

export class Loading extends React.Component<IProps, IState> {

    array;

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.array = Array.apply(null, Array(100)).map(String.prototype.valueOf,"_");
    }

    render(): JSX.Element {
        let styles = {
            loader: {
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 100,
                height: 100,
                transform: "translate(-50%, -50%)",
            },
            loader__box: {
                float: "left",
                position: "relative",
                opacity: 0,
                width: 10,
                height: 10,
                background: "#eeeeee",
                animation: "breathe 2000ms infinite"
            }
        };
        return (
            <div style={styles.loader}>
                {this.array.map((_, i) =>
                    <div key={i}
                         style={Object.assign({},
                                styles.loader__box,
                                {animationDelay: `${Math.random() * this.array.length * 40}ms`},
                                {background: awesomeColors[i]})}/>)}
            </div>
        );
    }
}