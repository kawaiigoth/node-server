const express = require('express'),
    app = express(),
    config = require('../lib/cfg'),
    log = require('../lib/loger'),
    helmet = require('helmet'),
    port = process.env.PORT || config.get('PORT'),
    ENV = process.env.NODE_ENV || config.get('NODE_ENV'),
    path = require('path'),
    bodyParser = require('body-parser');

app.use(helmet()); // Web secure defaults

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'../', '/public') , {
    extensions: ['html']
}));

app.get('/', (req, res) => {
    'use strict';
    res.sendFile('/public/index.html');
});

app.get('/index', (req, res) => {
    'use strict';
    log.debug("index");
    res.sendFile('/public/index.html');
});

/* route serve for yandex and google analytics and sitemap */
app.get('/yandex_cf3e705d3501f16f.html', function (req, res) {
    res.sendFile('public_html/yandex/yandex_cf3e705d3501f16f.html', {root: './'})
});
app.get('/google7d99bc5f3cd77a24.html', function (req, res) {
    res.sendFile('public_html/google/google7d99bc5f3cd77a24.html', {root: './'})
});
app.get('/sitemap.txt', function (req, res) {
    res.sendFile('public_html/files/sitemap.txt', {root: './'})
});

/* 404 function */
app.use(function (req, res) {
    log.debug("404");
    res.sendStatus(404);
});

/* Error handling function */
app.use(function (err, req, res, next) {
    'use strict';
    if (config.get('NODE_ENV') === 'development') {
        log.error(err.stack);
        next(err)
    } else {
        log.error(err.stack);
        res.sendStatus(500)
    }
});

app.listen(port); // Start server
log.info(`SERVER STARTED ON ${port} PORT`);
