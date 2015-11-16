var config   = require('./config.json'),
    fs       = require('fs'),
    restify  = require('restify');

/**
 * Create our server
 */
var server = restify.createServer({
    name: 'csp'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(config.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});

////////////////////////////////////////////////////////////////////////////////
//                                  ROUTES                                    //
////////////////////////////////////////////////////////////////////////////////

/*
** GET interface: /healthcheck
** http://localhost:{{ port }}/
** Used for pinging the service
*/
server.get('/healthcheck', function (req, res, next) {
    //res.setHeader('Content-Type', 'application/json');
    res.send('alive');
    return next();
});

/*
** GET interface
** http://localhost:{{ port }}/active
** Return an html page dynamically
*/
server.get('/active', function (req, res, next) {
    var body = fs.readFileSync('html/active.html', 'utf8');
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/html',
        //'Content-Security-Policy': "default-src https://csp.ngrok.com/html/active.html; child-src https://csp.ngrok.com/html/active.html; connect-src https://csp.ngrok.com/html/active.html; font-src https://csp.ngrok.com/html/active.html; img-src https://csp.ngrok.com/html/active.html; media-src https://csp.ngrok.com/html/active.html; object-src https://csp.ngrok.com/html/active.html; script-src https://csp.ngrok.com/html/active.html; style-src https://csp.ngrok.com/html/active.html; form-action https://csp.ngrok.com/html/active.html; frame-ancestors 'none'; plugin-types 'none'; report-uri https://csp.ngrok.com/csp-report",
        'Content-Security-Policy-Report-Only': "default-src https:; script-src https: 'unsafe-inline' 'unsafe-eval'; style-src https: 'unsafe-inline'; img-src http:; report-uri " + config.reportURI,
    });
    res.write(body);
    res.end();
});

/*
** GET interface: /html/:name
** http://localhost:{{ port }}/html/active.html
** Used to statically serve our page the contains the mixed content
*/
server.get(/\/html\/?.*/, restify.serveStatic({
    'directory': __dirname,
    'default': 'index.html'
}));

/*
** GET interface: /csp-report
** http://localhost:{{ port }}/csp-report
** Used for receiving the csp report from the browser
*/
server.post('/csp-report', function (req, res, next) {

    //console.log(req.headers);

    if (Buffer.isBuffer(req.body)) {
        console.log(req.body.toString('utf8'));
    } else {
        console.log(req.body);
    }

    res.end();
});
