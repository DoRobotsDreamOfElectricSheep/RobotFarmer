var http = require('http');
var request = require('request');
var pythonShell = require('python-shell');

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

			if(command == 'takepicture') {
				TakePicture();
				var jsonBody = {
					'id' : 'rasppi',
					'cmd' : 'picturetaken',
					'data' : {}
				};
				PostMessage(jsonBody, 'http://192.168.1.2:3000');
				console.log('POST: picture taken');
			}

			if(command == 'lightson') {
				//TODO; turn lights on
			}

			if(command == 'lightsoff') {
				//TODO; turn lights off
			}

		});

	res.end('message recieved');
	console.log("Server visited");
});

server.listen(4000, '0.0.0.0');
console.log('NodeJS running on Raspberry Pi');

function TakePicture() {
	pythonShell.run('capture_image.py',{scriptPath: './'}, function(err) 
	{ 
		if(err) console.log('capture error');
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