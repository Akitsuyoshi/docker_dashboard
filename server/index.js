/* eslint global-require: 0 */
import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import parseErr from 'parse-error';
import CONFIG from '../config';
import api from './controllers';
import graphqlRouter from './controllers/qraphQL';

const app = express();
const publicPath = path.resolve(__dirname, '../../', 'public');
const { port, env } = CONFIG;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
  res.set({
    Connection: 'close',
    'Cache-Control': 'no-cache',
  });

  next();
});

// For Development, Catch 404 forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// For Development, error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.use(logger('dev'), cors());

// Set the router to each endpoint
app.use('/api', bodyParser.urlencoded({ extended: false }), bodyParser.json(), api);
app.use('/graphql', bodyParser.urlencoded({ extended: false }), bodyParser.json(), graphqlRouter);

if (env === 'development') {
  // Webpack Requirements
  // const webpack = require('webpack');
  // const config = require('../webpack.config');
  // const webpackDevMiddleware = require('webpack-dev-middleware');
  // const webpackHotMiddleware = require('webpack-hot-middleware');
  // const compiler = webpack(config);

  // app.use(
  //   webpackDevMiddleware(compiler, {
  //     watchOptions: {
  //       ignored: /node_modules/,
  //     },
  //     noInfo: true,
  //     publicPath: config.output.path,
  //     port,
  //   })
  // );
  // app.use(
  //   webpackHotMiddleware(compiler, {
  //     log: false,
  //     heartbeat: 2000,
  //   })
  // );
  process.on('unhandledRejection', err => {
    console.error('Uncaught Error', parseErr(err));
  });
} else {
  // It serves any static files in production
  app.use(express.static(publicPath));
  app.set('port', port);
}

export default app;
