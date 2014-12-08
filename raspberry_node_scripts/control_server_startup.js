var http = require('http');
var request = require('request');
var pythonShell = require('python-shell');
var gpio = require('pi-gpio');

var farmerServerEndpoint = 'http://192.168.1.2:3000';

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
				console.log('POST: picture taken');
			}

			if(command == 'lightson') {
				TurnLightsOn();
			}

			if(command == 'lightsoff') {
				TurnLightsOff();
			}

			if(command == 'wateron') {
				TurnPumpOn();
			}

			if(command == 'wateroff') {
				TurnPumpOff();
			}

		});
	}

	res.end('message recieved');
	console.log("Server visited");
});

server.listen(4000, '0.0.0.0');
console.log('NodeJS running on Raspberry Pi');

function TakePicture() {
	pythonShell.run('capture_image.py',{scriptPath: './'}, function(err, result) 
	{ 
		if(err) console.log('capture error');

		var jsonBody = {
			'id' : 'raspi',
			'cmd' : 'capturecomplete'
		}

		PostMessage(jsonBody, farmerServerEndpoint);
	});
}

function TurnLightsOn() {
	gpio.open(16, "output", function(err) {
		gpio.write(16, 1, function() {
			gpio.close(16);
			var jsonBody = {
				'cmd' : 'updatestatus',
				'data' : {
					'control' : 'light_status',
					'value' : true
				}
			}
			PostMessage(jsonBody, farmerServerEndpoint);
		});
	});
}

function TurnLightsOff() {
	gpio.open(16, "output", function(err) {
		gpio.write(16, 0, function() {
			gpio.close(16);
			var jsonBody = {
				'cmd' : 'updatestatus',
				'data' : {
					'control' : 'light_status',
					'value' : false
				}
			}
			PostMessage(jsonBody, farmerServerEndpoint);
		});
	});
}

function TurnPumpOn() {
	gpio.open(7, "output", function(err) {
		gpio.write(7, 0, function() {
			gpio.close(7);
			var jsonBody = {
				'cmd' : 'updatestatus',
				'data' : {
					'control' : 'water_status',
					'value' : true
				}
			}
			PostMessage(jsonBody, farmerServerEndpoint);
		});
	});
}

function TurnPumpOff() {
	gpio.open(7, "output", function(err) {
		gpio.write(7, 1, function() {
			gpio.close(7);
			var jsonBody = {
				'cmd' : 'updatestatus',
				'data' : {
					'control' : 'water_status',
					'value' : false
				}
			}
			PostMessage(jsonBody, farmerServerEndpoint);
		});
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