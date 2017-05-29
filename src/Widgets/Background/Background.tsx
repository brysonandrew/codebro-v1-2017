import * as React from 'react';
import { isGL } from "../../utils/webgl";
import { GLBackgroundFromStore } from "./GLBackground/GLBackground";
import { IBackground } from "../../data/models";
import { DOMBackgroundFromStore } from "./DOMBackground/DOMBackground";

interface IProps {}

interface IState {
    isMounted?: boolean
    isAnimating?: boolean
    backgroundIndex?: number
}

export class Background extends React.Component<IProps, IState> {

    backgrounds = [];

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isMounted: false,
            isAnimating: false,
            backgroundIndex: 2 //safest background version - works on all browsers
        }
    }

    componentDidMount() {
        this.backgrounds = [
            {
                name: "img",
                displayTest: true,
                component:  <div style={ {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                                background: "url(/images/background/fallback.png)",
                                backgroundSize: "cover"
                            } }/>
            },
            {
                name: "DOM",
                displayTest: ((typeof requestAnimationFrame !== 'undefined')),
                component: <DOMBackgroundFromStore/>
            },
            {
                name: "GL",
                displayTest: isGL(),
                component: <GLBackgroundFromStore/>
            },
        ];
        const availableBackgrounds = this.backgrounds.filter(background => background.displayTest);
        this.setState({
            backgroundIndex: availableBackgrounds.length - 1 // coolest background should be last in this array
        });
        setTimeout(() => this.setState({isMounted: true}), 0); //cool onEnter effect
    }

    render(): JSX.Element {
        const styles = {
            background: {
                opacity: this.state.isMounted ? 1 : 0
            }
        };
        return (
            <div style={ styles.background }>
                {this.state.isMounted
                    ?   this.backgrounds[this.state.backgroundIndex].component
                    :   "loading"}
            </div>
        );
    }
}
