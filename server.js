const express = require('express');
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var database;

var test = "mongodb://test:test123@ds147436.mlab.com:47436/heroku_9q5nxrrj"
MongoClient.connect(test || "mongodb://localhost/responses",{ useNewUrlParser: true }, function (err,datab){
	if (err) throw err;
	console.log("connected");
	//creating table
	database = datab.db('heroku_9q5nxrrj')
	console.log(process.env.MONGODB_URI);
	var collection = database.collection('test');
	var docs = [{mykey:1}, {mykey:2}, {mykey:3}];
	collection.insertOne(docs[0]);
});

var app = express();
app.use(cors()); // enable cors
app.use(express.static('.'))
const router = express.Router();

router.post("/insert", (req, res) =>{
	const {id, update} = req.body;
	collection.insertOne(req.body, function(ess, res){
		if (err) throw err;
		console.log("inserted: " +req.body);
		var collection = database.collection('test');
		collection.find().toArray(function(err, docs) {
	    console.log(JSON.stringify(docs));
	});

	});
});

app.use("/api", router);
var port = process.env.PORT || 8080; 
console.log("PORT:  "+port); 
app.listen(port, function() {
  console.log("A4 Data Server is running")
});


































