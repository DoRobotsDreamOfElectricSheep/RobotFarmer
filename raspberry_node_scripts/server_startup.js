var http = require('http');
var server = http.createServer(function(req, res) {
	res.end('NodeJs running on Raspberry Pi');
	console.log("Server visited");
});

server.listen(4000, '0.0.0.0');
console.log('NodeJS running on Raspberry Pi');