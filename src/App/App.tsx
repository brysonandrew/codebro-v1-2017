import * as React from 'react';
import {addComponentCSS} from '../utils/css_styler';

addComponentCSS({
    //language=CSS
    default: `
        @font-face {
            font-family: PlayfairRegular;
            src: url(/fonts/PlayfairDisplay/PlayfairDisplaySC-Black.ttf);
        }
        @font-face {
            font-family: PlayfairBold;
            src: url(/fonts/PlayfairDisplay/PlayfairDisplaySC-Bold.ttf);
        }
        @font-face {
            font-family: PlayRegular;
            src: url(/fonts/Play/Play-Regular.ttf);
        }
        @font-face {
            font-family: PlayBold;
            src: url(/fonts/Play/Play-Bold.ttf);
        }
        * {
            margin: 0; 
            padding: 0;
            font-family: PlayRegular, 'arial', sans-serif;
            -webkit-appearance: none;
        }
        
        body {
            background: #212121;
        }

        button, input, a {
            /*background: none;*/
            /*border: none;*/
            /*outline: none;*/
            /*text-decoration: none;*/
            cursor: pointer;
        }
        
        p {
            margin: 2vh 0;
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
