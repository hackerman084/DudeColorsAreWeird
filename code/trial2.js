var counter = -1; 
var imageNames = ["introverts", "commodities", "shopping", "burger", "gaming"];
var paletteNames = ["calm", "disturbing", "exciting", "negative", "playful", "positive", "positive", "serious", "trustworthy"];
var imgName = "";
var palette = "";

function hide(id){
	document.getElementById(id).style.display = "none";
}
function show(id){
	document.getElementById(id).style.display = "block";
}
function initTrial(){
	if (counter >= 5){
		//hide everything
		hide("image");
		hide("next_button_div");
		hide("form")
		hide("next_button_div");

		//reveal submit button
		show("submit_button_div");

	}
	else{

		//reveal image
		show("image");
		chooseImage(counter);

		//show form
		show("form");
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