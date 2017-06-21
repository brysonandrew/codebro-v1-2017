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
            background: #fafafa;
            color: #311B92;
        }

        button, input, a {
            background: none;
            border: none;
            outline: none;
            text-decoration: none;
        }

        h4 {
            font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;
        }
        
        code {
            font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;
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
