const WORKERS = process.env.WEB_CONCURRENCY || 1;
const throng = require('throng');

throng({
    workers: WORKERS,
    lifetime: Infinity
}, start);

function start() {
    require('./app/index');
}

