var express = require('express');
var fs = require('fs');
var quotes = require('../quotes');
//var nextId = require('../app.js');
var router = express.Router();

/* GET add page. */
router.get('/', function(req, res, next) {
	res.render('add', { title: 'Add', 
		status: 'New',
		quote_recieved: "",
		speaker_recieved: "",
	});
});

router.post('/', function(req, res, next){
	var id = Math.floor(Math.random()*1000);//just a temporary id so they are the same for testing. 
	var quoteData = {"ID":id,"speaker":req.body.speaker,"quote":req.body.quote};
	quotes.push(quoteData);
	var data = JSON.stringify(quotes,null,2);
	console.log("Quotes JSON: " + data);
	fs.writeFile('../quotes.json', data);
	res.render('add', { 
		title: 'Add', 
		status: 'Saved', 
		quote_recieved: req.body.quote,
		speaker_recieved: req.body.speaker,
	});
});

module.exports = router;
