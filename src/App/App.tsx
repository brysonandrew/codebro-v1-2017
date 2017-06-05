import * as React from 'react';
import { addComponentCSS } from '../utils/css_styler';
import { Switch, Route } from "react-router";
import routes from "../routes/index";

addComponentCSS({
    //language=CSS
    default: `
        * {
            margin: 0; 
            padding: 0;
            font-family: 'Palanquin Dark', 'arial', sans-serif;
            -webkit-appearance: none;
        }
        
        body {
            position: relative;
            min-width: 320px;
            background: #311B92;
            padding-bottom: 20px;
            border: 1px solid transparent;
        }

        button, input, a {
            color: #fafafa;
            opacity: 1;
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
            font-family: 'Carrois Gothic', 'arial', sans-serif;
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
            <Switch>
                {routes.map((route, i) => (
                    <Route key={i}
                           exact
                           path={route.path}
                           component={route.component}/>
                ))}
            </Switch>
        );
    }
}
