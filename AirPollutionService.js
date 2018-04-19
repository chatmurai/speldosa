var request = require('request');
var events = require('events');

var url = "http://airqualitynow.eu/results/cities_data.php";

// ######################################################## CONSTRUCTOR
function AirPollutionService()
{
	
}

// adds the ability to broadcast events
AirPollutionService.prototype = new events.EventEmitter;

// ######################################################## METHODS
AirPollutionService.prototype.getAirPollutionIndice = function()
{
	var self = this;
	request(url, function(err, resp, data) 
	{
		if (err) throw err;
	    
		var j = JSON.parse(data);

		self.emit('dataReceived', j);
	});
}

// ######################################################## STATIC FUNCTIONS
exports.createInstance = function () 
{ 
	return new AirPollutionService();
}

