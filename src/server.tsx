import * as http from 'http';
import * as express from 'express';
import * as React from 'react';
const compression = require('compression');
import { getAllComponentsCSS } from './utils/css_styler';
import { Provider } from 'react-redux';
import { renderIndexView } from "./server/renderIndexView";
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

app.get('*', renderIndexView);

const server = http.createServer(app);

server.listen(port, (err:any) => {
  if (err) throw err;
  console.info(`[🚀 ] Server started on port ${port}`); // eslint-disable-line
});
