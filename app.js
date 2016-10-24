import http from 'http';
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import fileSession from 'session-file-store';
import Grant from 'grant-express';

import routes from './routes/index';
import auth from './routes/auth';

const app = express();
app.server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set up sessions
// TODO: create a new secret and persist it
const fileStoreOptions = {
};
const FileStore = fileSession(session);
const sessionOptions = {
  secret: 'aeffc8dd-1c13-4686-9637-365e2eaf6141',
  store: new FileStore(fileStoreOptions),
  cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false
};
app.use(session(sessionOptions));

// Set up oauth
// TODO: What are we going to do longer term about the secret key?
const grantOptions = {
  server: {
    protocol: 'http',
    host: 'localhost:3000',
    transport: 'session',
    callback: '/auth/callback',
    state: true
  },
  echohub: {
    authorize_url: 'http://localhost:3001/alexa/link',
    //authorize_url: 'https://www.echohub.io/alexa/link',
    access_url: 'https://www.echohub.io/api/oauth2/token',
    oauth: 2,
    key: 'hubber',
    secret: '15a3ba899397432aace0f776499c6a2f',
    scope: ['read', 'write'],
  }
};
const grant = new Grant(grantOptions);
app.use(grant);
app.get('/handle_echohub_callback', (req, res) => {
  console.log(req.session.grant.response);
  res.end(JSON.stringify(req.session.grant.response, null, 2));
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'stylesheets'),
  dest: path.join(__dirname, 'public/stylesheets'),
  prefix: '/stylesheets',
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.server.listen(process.env.PORT || 3000);

/*eslint no-console: "off"*/
console.log(`Started on port ${app.server.address().port}`);

module.exports = app;
