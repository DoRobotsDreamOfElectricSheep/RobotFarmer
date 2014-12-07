var http = require('http');
var pythonShell = require('python-shell');

var server = http.createServer(function(req, res) {
	var message = 'takepicture';
	
	if(message === 'takepicture') {
		TakePicture();
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

function TurnLightsOn() {
	//Stub
}

function TurnWaterOn() {
	//Stub
}

function Move(x,y) {
	//Stub
}