const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

if (process.env.NODE_ENV === 'development') {
  console.log('dotenv activated');
  require('dotenv').config();
}

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const dispatchRouter = require('./routes/dispatch');

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.disable('x-powered-by');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dispatch', dispatchRouter);

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: name || 'Swagger UI',
    version: version || '1.0.0',
    description: 'Api documentation with swagger-ui and jsdoc.'
  },
  basePath: '/api',
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{jwt: []}]
};

const swaggerJsdocOptions = {
  swaggerDefinition,
  apis: ['routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerJsdocOptions);

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: res.locals.message,
    error: res.locals.error,
  });
});

app.listen(app.get('port'), () => {
  console.log(`[${process.env.NODE_ENV}] Listening on port ${app.get('port')}`);
});

module.exports = app;
