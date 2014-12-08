var image = require('./color_detection');
var http = require('http');
var fs = require('fs');
var request = require('request');
var qs = require('querystring');

var raspPiEndpoint = 'http://192.168.1.3:4000';
var selectedColor;
var latestImageName;

var server = http.createServer(function(req, res) {
	res.writeHead(200,{'Access-Control-Allow-Origin':'*', 'Content-Type':'text/plain'});
	//res.header('Access-Control-Allow-Origin', 'GET,PUT,POST,DELETE');
	//res.header('Access-Control-Allow-Origin', 'Content-Type, Authorization');

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

			if(command == 'takepicture') {
				var jsonBody = { 
					'id' : 'farmerserver',
					'cmd' : 'takepicture',
					'data' : {}
				};
				console.log("sending take picture cmd to PI");
				console.log(jsonBody);
				PostMessage(jsonBody, raspPiEndpoint);
			}


			if(command == 'capturecomplete') {
				latestImageName = 'capture_' + Date.now() + '.jpg';
				console.log('download image ' + latestImageName + ' ...');
				downloadImage('http://192.168.1.3:8080/arm_image.jpg', 'pi_pictures/' + latestImageName, function() {
					console.log('done');
					console.log("pocessing image now...");
					//image.processImage('strawberry_initial.jpg', selectedColor);
				});
				
				//TODO: process picture, generate instructions and send back
			}

			if(command == 'lightson') {
				var jsonBody = { 
					'id' : 'farmerserver',
					'cmd' : 'lightson',
					'data' : {}
				};
				console.log("sending lights on to PI");
				console.log(jsonBody);
				PostMessage(jsonBody, raspPiEndpoint);
			}

			if(command == 'lightsoff') {
				var jsonBody = { 
					'id' : 'farmerserver',
					'cmd' : command,
					'data' : {}
				};

				PostMessage(jsonBody, raspPiEndpoint);
			}

			if(command == 'cameraimageurl') {
				res.end('http://192.168.1.2:8080/' + latestImageName);
			}
		});
	}

	//res.end("message recieved");
	
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
