import index from '../routes/index';
import auth from '../routes/auth';
import iot from '../routes/iot';
import debug from '../routes/debug';

const grantOptions = {
  server: {
    protocol: 'http',
    host: 'localhost:3001',
    transport: 'session',
    callback: '/auth/callback',
    state: true,
  },
  echohub: {
    authorize_url: 'https://www.echohub.io/alexa/link',
    access_url: 'https://www.echohub.io/api/oauth2/token',
    oauth: 2,
    key: 'hubber',
    secret: '15a3ba899397432aace0f776499c6a2f',
    scope: ['read', 'write'],
    transport: 'session',
  },
};

app.use('/', index);
app.use('/auth', auth);
app.use('/iot', iot);
app.use('/debug', debug);
