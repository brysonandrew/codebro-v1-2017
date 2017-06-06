import * as http from 'http';
import * as express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
const compression = require('compression');
import { StaticRouter as Router } from 'react-router-dom';
import { getAllComponentsCSS } from './utils/css_styler';
import { store } from "./redux/store";
import { Provider } from 'react-redux';
import { App } from "./App/App";
const release = (process.env.NODE_ENV === 'production');
const port = (parseInt(process.env.PORT, 10) || 3000) - (!release as any);
const app = express();

//compress requests
app.use(compression());

// Set view engine
app.set('views', './src/server/views');
app.set('view engine', 'ejs');
app.use('/fonts', express.static('./public/fonts'));
app.use('/client.js', express.static('./build/client.js'));
app.use('/images', express.static('./public/images'));

// Endpoint to get all React components CSS
app.get('/components.css', (req, res) => {
  res.setHeader('content-type', 'text/css');
  res.send(getAllComponentsCSS());
});

// app.use('/info', info);
// Route handler that rules them all!
app.get('*', (req: any, res: any) => {
    const context = {};
    if (context["url"]) {
        res.redirect(301, context["url"])
    } else {
        res.render('index', {
            renderedRoot: ReactDOMServer.renderToString(
                <Provider store={store}>
                    <Router
                        location={req.url}
                        context={context} >
                        <App/>
                    </Router>
                </Provider>
            )
        });
    }
});

const server = http.createServer(app);

server.listen(port, (err:any) => {
  if (err) throw err;
  console.info(`[🚀 ] Server started on port ${port}`); // eslint-disable-line
});
