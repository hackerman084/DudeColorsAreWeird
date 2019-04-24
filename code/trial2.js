var counter = -1; 
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
	counter++;
	//hide start button
	hide("start_button_div");
	initTrial();
}

function onNextPress(){
	counter++;
	initTrial();
	getInfo();
	clearInfo();

}

function getRadio(nameVal){
	return document.querySelector("input[name = \"" + nameVal + "\"]:checked").value;
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
	var question1 = getRadio("curr_state");
	console.log("QUESTION 1: " +question1);
	var question2 = new Array(5);
	for(var i = 0; i < 5; i++){
		question2[i] = getText("emotion" + i);
	}
	console.log("QUESTION 2: " +question2);

	var question3 = paletteNames[getRadio("palette1")];
	console.log("QUESTION 3: " +question3);

	var question4 = getRadio("satisfied_1");
	console.log("QUESTION 4: " +question4);

	var question5 = paletteNames[getRadio("palette2")]
	console.log("QUESTION 5: " +question5);

	var question6 = getRadio("satisfied_2");
	console.log("QUESTION 6: " +question6);

	var question7 = getRadio("negative");
	console.log("QUESTION 7: " +question7);

	var question8 = getRadio("positive");
	console.log("QUESTION 8: " +question8);

	var question9 = getRadio("light");
	console.log("QUESTION 9: " +question9);

	var question10 = getText("response");
	console.log("QUESTION 10: " +question10);

	//probably will send information to database at this point




}
function onSubmitPress(){
	console.log("SUBMIT!");



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