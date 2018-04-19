// This module uses neouart :
// http://wp.josh.com/2014/09/02/give-your-raspberrypi-a-neopixel/
// https://github.com/bigjosh/NeoUart

var exec = require('child_process').exec;

/**
* Returns a string which is a random hexa value.
*/
function rndColor() {
    var r = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2), // red
        g = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2), // green
        b = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2); // blue

    return r + g + b;
}

// ######################################################## CONSTRUCTOR
function NeoPixel()
{
	
}

NeoPixel.prototype.turnOn = function(pColor)
{
	var color;
	pColor !== undefined ? color = pColor : color = 0xFFFFFF;
	exec('neouart -i ' + color.toString(16));
}

NeoPixel.prototype.turnOff = function()
{
	exec('neouart -i 000000');
}

// ######################################################## STATIC FUNCTIONS
exports.createInstance = function () 
{ 
	return new NeoPixel();
}
