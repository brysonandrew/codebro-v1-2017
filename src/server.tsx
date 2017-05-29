import * as http from 'http';
import * as express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Router, RouterContext, match } from 'react-router';
import { getAllComponentsCSS } from './utils/css_styler';
import { store } from "./redux/store";
import { Provider } from 'react-redux';
import routes from './routes';

const release = (process.env.NODE_ENV === 'production');
const port = (parseInt(process.env.PORT, 10) || 3000) - (!release as any);
const app = express();

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
  // Do a router match
  match({
    routes: (
      <Provider store={store}>
        <Router>{routes}</Router>
      </Provider>
    ),
    location: req.url,
  },
  (err: any, redirect: any, props: any) => {
    // Some sanity checks
    if (err) {
      return res.status(500).send(err.message);
    } else if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search);
    } else if (!props) {
      return res.status(404).send('not found');
    }

    // Respond with EJS template
    res.render('index', {
      renderedRoot: ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
        )
    });
  });
});

const server = http.createServer(app);

server.listen(port, (err:any) => {
  if (err) throw err;
  console.info(`[🚀 ] Server started on port ${port}`); // eslint-disable-line
});
