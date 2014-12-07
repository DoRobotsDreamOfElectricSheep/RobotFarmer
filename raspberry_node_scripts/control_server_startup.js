var http = require('http');
var request = require('request');
var pythonShell = require('python-shell');

var server = http.createServer(function(req, res) {
	var message = 'takepicture';
	
	if(message === 'takepicture') {
		TakePicture();
		PostMessage('pictureTaken', 'http://192.168.1.2:3000');
		console.log('POST: picture taken');
	}

	res.end('NodeJs running on Raspberry Pi');
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