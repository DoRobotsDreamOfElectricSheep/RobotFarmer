var cv = require('opencv');

module.exports = {
	processImage : function(image, hexColor) {

		var rgb = toRGB(hexColor);
		var R = rgb[0];
		var G = rgb[1];
		var B = rgb[2];

		console.log('R:' + R + ' G: ' + G + ' B: ' + B);
		// (B)lue, (G)reen, (R)ed
		var upper_threshold = [B + 10, G + 60, R + 100];
		var lower_threshold = [B - 10, G - 40, R - 100];

		cv.readImage(image, function(err, image) {

	  	if (image.width() < 1 || image.height() < 1) {
	  		throw new Error('Image has no size');
	  	}

	  	image.inRange(lower_threshold, upper_threshold);

	  	
	  	image.save('./strawberry_final.jpg');
		});
	}
};

function toRGB(hex) {
	var num = parseInt(hex, 16);
	return [num >> 16, num >> 8 & 255, num & 255];
}






