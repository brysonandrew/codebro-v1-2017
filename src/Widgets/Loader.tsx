import * as React from 'react';
import {addComponentCSS} from "../utils/css_styler";
import {colors} from "../data/themeOptions";

interface IProps {}

interface IState {}

addComponentCSS({
    //language=CSS
    default: `
        @keyframes gradients {
            0%   {background-position: 0 0;}
            25% {background-position: 50% 0;}
            50% {background-position: 90% 0;}
            60% {background-position: 60%;}
            75% {background-position: 40%;}
            100%  {background-position: 0 0;}
        }
    `
});

export class Loader extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const styles = {
            loader: {
                width: "calc(100% - 40px)",
                margin: 20,
                height: "100vh",
                backgroundImage: `linear-gradient(to right, ${colors.std}, ${colors.wht}, ${colors.std}, ${colors.wht})`,
                backgroundSize: "600%",
                backgroundPosition: "0 0",
                animationDuration: "5000ms",
                animationIterationCount: "infinite",
                animationName: "gradients"
            }
        } as any;
        return (
            <div style={ styles.loader }/>
        );
    }
}
