const express = require('express');
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var database;

MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost/responses",{ useNewUrlParser: true }, function (err,datab){
	if (err) throw err;
	console.log("connected");
	//creating table
	database = datab.db('responses')

	var collection = database.collection('test');
	var docs = [{mykey:1}, {mykey:2}, {mykey:3}];
	collection.insert(docs[0]);
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
app.listen(process.env.PORT || 8080, function() {
  console.log("A4 Data Server is running")
});


































