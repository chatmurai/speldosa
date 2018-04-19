(function(){

	// CONSTANTS
	var REFRESH_INTERVAL = 3600; // in seconds 3600 -> 1h
	var COLORS = [0x22ed00, 0x22ed00, 0x5fca00, 0x88b300, 0xbf9600, 0xf77800, 0xff6500, 0xff4d00, 0xff0c01, 0xee3278];

	// NEOPIXEL LED HANDLING
	var NeoPixelClass = require('./NeoPixel');
	var neoPixel = NeoPixelClass.createInstance();
	neoPixel.turnOff();

	// AIR POLLUTION SERVICE HANDLING
	var AirPollutionServiceClass = require('./AirPollutionService');
	var airPollutionService = AirPollutionServiceClass.createInstance();

	var MY_CITY = 'Bordeaux';

	/**
	* Start asking data 
	*/
	function askForPollutionData()
	{
		neoPixel.turnOn(0xFFFFFF);
		airPollutionService.getAirPollutionIndice();
	}

	/**
	* Triggered when data is received
	*/
	airPollutionService.on('dataReceived', function(data){
		for (var i in data.cities) {
		  if(data.cities[i].name == MY_CITY)
		  {
		  	var indexes = data.cities[i].indexes.background;
		  	analysePollutionData(indexes);
		  	break;
		  }
		}
  	});

	/**
	* Analyses the pollution data and lights up the DEL with the corresponding color
	*/
  	function analysePollutionData(pollutionIndexesArray)
  	{
  		var count = 0;
  		var total = 0;
  		for(var i in pollutionIndexesArray)
  		{
  			if (pollutionIndexesArray[i] != '-1' && pollutionIndexesArray[i] != null && pollutionIndexesArray[i] != '')
  			{
  				count++;
  				total += parseInt(pollutionIndexesArray[i]);
  			}
  		}

  		var indice = total / count;

  		// display

	    if(indice < 10) // 1 digit
	    {
			neoPixel.turnOn(COLORS[0]);
			console.log('DEL color = #' + COLORS[0].toString(16));
	    }
	    else if(indice < 100) // 2 digits
	    {
	    	var index = parseInt(indice.toString().substr(0, 1));
	    	neoPixel.turnOn(COLORS[index]);
	    	console.log('DEL color = #' + COLORS[index].toString(16));
	    }
	    else // 3 digits (=100)
	    {
	    	neoPixel.turnOn(COLORS[9]);
	    	console.log('DEL color = #' + COLORS[9].toString(16));
	    }

	    var d = new Date();
	    console.log(d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' / ' + d.getHours() + ':' + d.getMinutes() + ' : pollution indice is ' + indice + ' on 100.');

  	}

	// EXECUTION
	var t = setInterval(askForPollutionData, REFRESH_INTERVAL * 1000);
	askForPollutionData();
  	

})();
