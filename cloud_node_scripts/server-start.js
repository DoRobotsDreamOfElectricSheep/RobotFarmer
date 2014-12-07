var http = require('http');
var fs = require('fs');
var request = require('request');
var qs = require('querystring');

var raspPiEndpoint = "localhost:4000";

var server = http.createServer(function(req, res) {
	var msg = "";

	if(req.method == 'POST') {
		var body = ' ';
		req.on('data', function(data) {
			body += data;
			console.log("BODY: " + body);
		});
		req.on('end', function() {
			var post = JSON.parse(body);
			msg = post.msg;
			console.log("POST MESSAGE: " + post.msg);
		});
	}

	if(msg == 'pictureTaken') {
		downloadImage('http://192.168.1.3:8080/arm_image.jpg', 'pic_from_pi.jpg', function() {
			console.log('done');
		});

		//TODO: process picture, generate instructions and send back
	}
	
});

server.listen(3000, '0.0.0.0');
console.log("NodeJS running on Robot Farmer Server on 0.0.0.0:3000");

var downloadImage = function(url, filename, callback) {
	request.head(url, function(err, res, body) {
		console.log('content-type', res.headers['content-type']);
		console.log('content-length', res.headers['content-length']);

		request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
}

function PostMessage(message, endpoint) {
	request.post(
			endpoint,
			{ json: {msg: message}},
			function (error, response, body) {
				if(!error && response.statusCode == 200) {
					console.log(body);
				}
			}
		);
}
