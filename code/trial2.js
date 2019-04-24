var counter = -1; 
var imageNames = ["introverts", "commodities", "shopping", "burger", "gaming"];
var paletteNames = ["calm", "disturbing", "exciting", "negative", "playful", "positive", "positive", "serious", "trustworthy"];
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
	getInfo();
	initTrial();
}

function getInfo(){
	var question1 = document.querySelector('input[name = "curr_state"]:checked').value;
	console.log("QUESTION 1: " +question1);
	var question2 = new Array(5);
	for(var i = 0; i < 5; i++){
		question2[i] = document.getElementById("emotion" + i).value;
	}
	console.log("QUESTION 2: " +question2);

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