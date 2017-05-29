import * as React from 'react';
import {addComponentCSS} from '../utils/css_styler';
import {colors} from "../data/themeOptions";

addComponentCSS({
    //language=CSS
    default: `
        @font-face {
            font-family: PalanquinDark;
            /*noinspection CssUnknownTarget*/src: url(/fonts/PalanquinDark/PalanquinDark-Regular.ttf);
        }
        @font-face {
            font-family: CarroisGothic;
            /*noinspection CssUnknownTarget*/src: url(/fonts/CarroisGothic/CarroisGothicSC-Regular.ttf);
        }
        @font-face {
            font-family: PlayfairRegular;
            /*noinspection CssUnknownTarget*/src: url(/fonts/PlayfairDisplay/PlayfairDisplaySC-Black.ttf);
        }
        @font-face {
            font-family: PlayfairBold;
            /*noinspection CssUnknownTarget*/src: url(/fonts/PlayfairDisplay/PlayfairDisplaySC-Bold.ttf);
        }
        @font-face {
            font-family: PlayRegular;
            /*noinspection CssUnknownTarget*/src: url(/fonts/Play/Play-Regular.ttf);
        }
        @font-face {
            font-family: PlayBold;
            /*noinspection CssUnknownTarget*/src: url(/fonts/Play/Play-Bold.ttf);
        }
        * {
            margin: 0; 
            padding: 0;
            font-family: PalanquinDark, 'arial', sans-serif;
            -webkit-appearance: none;
        }
        
        body {
            background: #311B92;
        }

        button, input, a {
            background: none;
            border: none;
            outline: none;
            text-decoration: none;
            cursor: pointer;
        }
        
        p {
            margin: 2vh 0;
        }
        
        h1, h2, h3, h4 {
            font-family: CarroisGothic, 'arial', sans-serif;
            color: #fafafa;
        }
        
        code, pre {
            background: #212121;
            font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;
            color: #66F8B6;
            border-radius: 6px;
            padding: 4px;
            margin: 2px 0;
        }
        
        ul li {
            list-style-position: inside;
            list-style-type: square;
        }
    `
});


export class App extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
