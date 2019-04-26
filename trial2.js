var url =  "http://localhost:8080/"; 

var counter = 0; 
var imageNames = ["introverts", "commodities", "shopping", "burger", "gaming"];
var paletteNames = ["disturbing", "negative", "serious", "trustworthy", "calm", "playful", "positive", "exciting"];
var imgName = "";
var palette = "";
var trial_data = {};
var radio = ["curr_emotion", "curr_state", "palette1", "satisfied1", "palette2", "satisfied2", "conn", "light", "light_state"]
var exp2 = {};
function hide(id){
	document.getElementById(id).style.display = "none";
}
function show(id, value="block"){
	document.getElementById(id).style.display = value;
}


function initTrial(){
	if (counter >= 1){
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
	trial_data = JSON.parse(window.localStorage.getItem("trial_data"));
	console.log("TRIAL DATA: " + JSON.stringify(trial_data));
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

	for(var i = 0; i < radio.length; i++){
		var arr = document.getElementsByName(radio[i]);
		arr.forEach((d) => {d.checked=false;});
	}

	for(var i = 0; i < 5; i++){
		document.getElementById("emotion"+i).value = "";
	}

	document.getElementById("response").value = "";
	document.getElementById("curr_emotion").value = "";
}

function getInfo(){

	var answers = {};
	var question1 = getText("curr_emotion").trim();
	if (!question1 || question1.length === 0){
		show("error_div");
		return false;
	}
	else{
		console.log("QUESTION1: "+question1);
		answers["q1"] = question1;
	}

	//should do null checks to force people to answer before moving onto next screen
	var question2 = getRadio("curr_state");
	if (!question2){
		show("error_div");
		return false;
	}
	console.log("QUESTION 2: " +question2);

	answers["q2"] = question2;

	var question3 = new Array(5);
	for(var i = 0; i < 5; i++){
		var str = getText("emotion" + i).trim();
		if (!str || str.length === 0){
			show("error_div");
			return false;
		}
		else{
			question3[i] = str;
		}
	}
	answers["q3"] = question3;
	console.log("QUESTION 3: " +question3);

	var question4 = paletteNames[getRadio("palette1")];
	if (!question4){
		show("error_div");
		return false;
	}
	answers["q4"] = question4;
	console.log("QUESTION 4: " +question4);

	var question5 = getRadio("satisfied1");
	if (!question5){
		show("error_div");
		return false;
	}
	console.log("QUESTION 5: " +question5);

	var question6 = paletteNames[getRadio("palette2")]
	if (!question6){
		show("error_div");
		return false;
	}
	console.log("QUESTION 6: " +question6);
	answers["q6"] = question6;

	var question7 = getRadio("satisfied2");
	if (!question7){
		show("error_div");
		return false;
	}
	console.log("QUESTION 7: " +question7);
	answers["q7"] = question7;

var question8 = getText("response").trim();
	if (!question8 || question8.length === 0){
		show("error_div");
		return false;
	}
	console.log("QUESTION 8: " +question8);
	answers["q8"] = question8;


	var question9 = getRadio("conn");
	if (!question9){
		show("error_div");
		return false;
	}
	answers["q9"] = question9;
	console.log("QUESTION 9: " +question9);

	var question10 = getRadio("light");
	if (!question10){
		show("error_div");
		return false;
	}
	console.log("QUESTION 10: " +question10);
	answers["q10"] = question10;

	var question11 = getRadio("light_state");
	if (!question11){
		show("error_div");
		return false;
	}
	console.log("QUESTION 11: " +question11);
	answers["q11"] = question11;


	//probably will send information to database at this point
	console.log(answers);
	
	var trialNum = "trial" +counter;
	exp2[trialNum] = answers;
	console.log(exp2);
	return true;



}
function onSubmitPress(){
	console.log("SUBMIT!");
	hide("submit_button_div");
	show("thank_you_div");
	trial_data["exp2"] = exp2;

	console.log("TRIAL DATA: " +JSON.stringify(trial_data));
	axios.post("/api/insert", trial_data);




}

function chooseImage(counter){
	//choose an image
	imgName = imageNames[counter];
	console.log(imgName);
	var pal_index = Math.floor((Math.random() * paletteNames.length));
	console.log(typeof(pal_index));
	palette = paletteNames[pal_index];

	var path = "./infographics/neutral/" + imgName + "/" + palette + imgName +".png";

	console.log(path);
	document.getElementById("image").src = path;

}