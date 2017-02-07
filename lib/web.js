import index from '../routes/index';
import auth from '../routes/auth';
import iot from '../routes/iot';
import debug from '../routes/debug';
app.use('/', index);
app.use('/auth', auth);
app.use('/iot', iot);
app.use('/debug', debug);
