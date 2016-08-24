var express = require('express');
var csv = require('csv');
var app = express();
const fs = require("fs");

var colleges; 


fs.readFile('db/database.csv', (err, data) => {
  

console.log("[cAPi] : File read !");

	csv.parse(data, function(err, data){

	colleges = data;

	console.log("[cAPi] : CSV Loaded !");
    
  });

});
   


app.post('/colleges/total', function (req, res) {

	var str = {
		total : colleges.length
	};

	res.send(JSON.stringify(str));

})


app.post('/colleges/search', function (req, res) {

	var keyword = req.headers.keyword.toLowerCase();
	var result = [];

	for(var i = 0 ; i < colleges.length ; i++){

		if(colleges[i][2].toLowerCase().indexOf(keyword)>=0){				
				result.push(colleges[i]);
		}
	}

	res.send(JSON.stringify(result));

})

app.post('/colleges/state', function (req, res) {

	var state = req.headers.state.toLowerCase();
	var offset = req.headers.offset;
	console.log(offset);
	var result = [];	
	

	for(var i = 0 ; i < colleges.length; i++){

		if(colleges[i][4].toLowerCase().indexOf(state)>=0){				
				result.push(colleges[i]);				
		}
	}

	var limitResult = [];
	var count = 0;

	var limit = Number(offset) + 10;

	for(i = offset ; i < limit ; i++){

		limitResult.push(result[i]);

	}

	res.send(JSON.stringify(limitResult));

})


app.post('/colleges/district', function (req, res) {

	var district = req.headers.district.toLowerCase();
	var offset = req.headers.offset;
	console.log(offset);
	var result = [];	
	

	for(var i = 0 ; i < colleges.length; i++){

		if(colleges[i][5].toLowerCase().indexOf(district)>=0){				
				result.push(colleges[i]);				
		}
	}

	var limitResult = [];
	var count = 0;

	var limit = Number(offset) + 10;

	for(i = offset ; i < limit ; i++){

		limitResult.push(result[i]);
		
	}

	res.send(JSON.stringify(limitResult));

})


var server = app.listen(8081, function () {

  var host = "127.0.0.1"
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})