var image = require('./color_detection');
var http = require('http');
var fs = require('fs');
var request = require('request');
var qs = require('querystring');

var raspPiEndpoint = "192.168.1.3:4000";
var selectedColor;

var server = http.createServer(function(req, res) {
	var command = '';
	var post;

	if(req.method == 'POST') {
		var body = ' ';
		req.on('data', function(data) {
			body += data;
			console.log("BODY: " + body);
		});
		req.on('end', function() {
			post = JSON.parse(body);
			command = post.cmd.toLowerCase();
			console.log("COMMAND: " + command);

			if(command == 'setcolor') {
				selectedColor = post.data.color.toLowerCase();
				
				if(selectedColor.startsWith('#')) {
					selectedColor = selectedColor.substring(1);
				}

				console.log("COLOR SET TO: " + selectedColor);
			}

			if(command == 'picturetaken') {
				/*downloadImage('http://192.168.1.3:8080/arm_image.jpg', 'pic_from_pi.jpg', function() {
					console.log('done');
				});*/
				console.log("pocessing image now...");
				image.processImage('strawberry_initial.jpg', selectedColor);
				//TODO: process picture, generate instructions and send back
			}

			if(command == 'lightsOn') {
				var jsonBody = { 
					'id' : 'farmerserver',
					'cmd' : 'lightson',
					'data' : {}
				};

				PostMessage(jsonBody, raspPiEndpoint);
			}

			if(command == 'lightsOff') {
				var jsonBody = { 
					'id' : 'farmerserver',
					'cmd' : 'lightsoff',
					'data' : {}
				};

				PostMessage(jsonBody, raspPiEndpoint);
			}
		});
	}

	res.end("message recieved");
	
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

function PostMessage(jsonBody, endpoint) {
	request.post(
			endpoint,
			{ json: jsonBody },
			function (error, response, body) {
				if(!error && response.statusCode == 200) {
					console.log(body);
				}
			}
		);
}

if(typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) == 0;
	};
}