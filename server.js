const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var database;
var collection; 

var test = "mongodb://test:test123@ds147436.mlab.com:47436/heroku_9q5nxrrj"
MongoClient.connect(test || "mongodb://localhost/responses",{ useNewUrlParser: true }, function (err,datab){
	if (err) throw err;
	console.log("connected");
	//creating table
	database = datab.db('heroku_9q5nxrrj')
	console.log(process.env.MONGODB_URI);
	collection = database.collection('data');

});

var app = express();
app.use(cors()); // enable cors
app.use(express.static('.'))
const router = express.Router();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
router.post("/insert", (req, res) =>{
	// console.log("RES: ");
	// console.log(res);
	// console.log("REQ: ");
	// console.log(req);
	console.log("REQ.BODY: "+req.body);
	console.log(req.body);
	collection.insertOne(req.body, function(ess, res){
		if (err) throw err;
		console.log("inserted: " +req.body);
	});
});

app.use("/api", router);
var port = process.env.PORT || 8080; 
console.log("PORT:  "+port); 
app.listen(port, function() {
  console.log("Final Project Data Server is running")
});


































