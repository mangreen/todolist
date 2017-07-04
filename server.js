var local = require('./config/local');


// Webpack
require('babel-core/register');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

// Utility

var express = require('express');
var Resource = require('express-resource');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var compress = require('compression');
var methodOverride = require('method-override');
var logger = require('./util/logger.js');


// Init express

var app = new express();


// Webpack

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))


// Port

app.set('port', local.port);

app.on('error', function(err) {
    console.error(err);
});


// Configuration
app.use(compress());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());


app.use(methodOverride('X-HTTP-Method-Override'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.static(__dirname + "/public"));


// Enviroment Configuration
if (app.get('env') === 'development') {
    app.use(require('morgan')('short', {
        stream: logger.stream
    }));
    app.use(errorhandler());
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    app.enable('view cache');
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}


// Route
var api = {
    index: require('./routes/index'),
    image: require('./routes/image_api'),
};

app.post('/api/images/upload', api.image.upload);
app.get('/images/:id/:size', api.image.fetch);
app.get('/images/:id', api.image.fetch);

app.get('/', api.index.handleRouting);
app.get('*', api.index.handleRouting);

module.exports = app;
