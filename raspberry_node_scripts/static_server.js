var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var staticServer = require('node-static');

var file = new(staticServer.Server)({cache:600, headers: {'X-Powered-By': 'node-static'}});
var server = http.createServer(function(req, res) {

	req.addListener('end', function() {
		file.serve(req, res, function(err, result) {
			if(err) {
				console.error('Error serving %s - %s', req.url, err.message);
				if(err.status === 404 || err.status === 500) {
					file.serveFile(util.format('/%d.html', err.status), err.statys, {}, req, res);
				}
				else {
					res.writeHead(err.status, err.headers);
					res.end();
				}
			}
		});
	});
});

server.listen(80, '0.0.0.0');
console.log('NodeJS running on 0.0.0.0');