var MongoClient = require('mongodb').MongoClient;
var database;
MongoClient.connect("mongodb://localhost/responses",{ useNewUrlParser: true }, function (err,db){
	if (err) throw err;
	database = db;
	console.log("connected");
	//creating table
	var collection = db.collection('test');
	var docs = [{mykey:1}, {mykey:2}, {mykey:3}];
	collection.insertOne({
	        Employeeid: 4,
	        EmployeeName: "NewEmployee"
	    });


	var cursor = collection.find();

    cursor.each(function(err, doc) {

        console.log(doc);

    });


	//db.close();
});

var counter = 0; 
var imageNames = ["introverts", "commodities", "shopping", "burger", "gaming"];
var paletteNames = ["disturbing", "negative", "serious", "trustworthy", "calm", "playful", "positive", "exciting"];
var imgName = "";
var palette = "";

function hide(id){
	document.getElementById(id).style.display = "none";
}
function show(id, value="block"){
	document.getElementById(id).style.display = value;
}


function initTrial(){
	if (counter >= 5){
		//hide everything
		hide("image");
		hide("next_button_div");
		hide("flex_container");

		//reveal submit button
		show("submit_button_div");
	}
	else{
		hide("error_div");
		//reveal form
		show("flex_container", "flex");
		show("image");
		show("form", "flex");
		chooseImage(counter);

		//reveal next button
		show("next_button_div");
		
	}
}

function onStartPress(){
	console.log("PRESSED");
	//hide start button
	hide("start_button_div");
	initTrial();
}

function onNextPress(){

	if (getInfo()){
		clearInfo();
		counter++;
		initTrial();


	}
	else{
		getInfo();
	}

}

function getRadio(nameVal){
	var arr = document.getElementsByName(nameVal);
	for(var i = 0; i < arr.length; i++){
		if (arr[i].checked){
			return arr[i].value;
		}
	}
	return null;
}

function getText(id){
	return document.getElementById(id).value;
}

function clearInfo(){
	console.log("CLEAR INFO");
	var radio = ["curr_state", "palette1", "satisfied_1", "palette2", "satisfied_2", "negative", "positive", "light"]

	for(var i = 0; i < radio.length; i++){
		var arr = document.getElementsByName(radio[i]);
		arr.forEach((d) => {d.checked=false;});
	}

	for(var i = 0; i < 5; i++){
		document.getElementById("emotion"+i).value = "";
	}

	document.getElementById("response").value = "";

}
function getInfo(){
	//should do null checks to force people to answer before moving onto next screen
	var question1 = getRadio("curr_state");
	console.log("QUESTION 1: " +question1);
	if (!question1){
		show("error_div");
		return false;
	}

	var question2 = new Array(5);
	for(var i = 0; i < 5; i++){
		var str = getText("emotion" + i).trim();
		if (!str || str.length === 0){
			show("error_div");
			return false;
		}
		else{
			question2[i] = str;
		}
	}
	console.log("QUESTION 2: " +question2);

	var question3 = paletteNames[getRadio("palette1")];
	if (!question3){
		show("error_div");
		return false;
	}
	console.log("QUESTION 3: " +question3);

	var question4 = getRadio("satisfied_1");
	if (!question4){
		show("error_div");
		return false;
	}
	console.log("QUESTION 4: " +question4);

	var question5 = paletteNames[getRadio("palette2")]
	if (!question5){
		show("error_div");
		return false;
	}
	console.log("QUESTION 5: " +question5);

	var question6 = getRadio("satisfied_2");
	if (!question6){
		show("error_div");
		return false;
	}
	console.log("QUESTION 6: " +question6);

	var question7 = getRadio("negative");
	if (!question7){
		show("error_div");
		return false;
	}
	console.log("QUESTION 7: " +question7);

	var question8 = getRadio("positive");
	if (!question8){
		show("error_div");
		return false;
	}
	console.log("QUESTION 8: " +question8);

	var question9 = getRadio("light");
	if (!question9){
		show("error_div");
		return false;
	}
	console.log("QUESTION 9: " +question9);

	var question10 = getText("response").trim();
	if (!question10 || question10.length === 0){
		show("error_div");
		return false;
	}
	console.log("QUESTION 10: " +question10);

	//probably will send information to database at this point
	return true;



}
function onSubmitPress(){
	console.log("SUBMIT!");
	hide("submit_button_div");
	show("thank_you_div");



}

function chooseImage(counter){
	//choose an image
	imgName = imageNames[counter];
	console.log(imgName);
	var pal_index = Math.floor((Math.random() * paletteNames.length));
	console.log(typeof(pal_index));
	palette = paletteNames[pal_index];

	var path = "../infographics/neutral/" + imgName + "/" + palette + imgName +".png";

	console.log(path);
	document.getElementById("image").src = path;

}