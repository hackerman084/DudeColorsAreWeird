var counter = 0; 
var imageNames = ["introverts", "commodities", "shopping", "burger", "gaming"];
var paletteNames = ["calm", "disturbing", "exciting", "negative", "playful", "positive", "positive", "serious", "trustworthy"];

chooseImage(); 

function initTrial(){
	if (counter === 0){
		//show start button 
		//hide everything else
	}
	else if (counter == 5){
		//show complete button
	}
}

function onStartPress(){
	




}

function onNextPress(){

}

function onSubmitPress(){

}

function chooseImage(){
	//choose an image
	var imgName = imageNames[counter];
	var pal_index = Math.floor((Math.random() * paletteNames.length));
	console.log(typeof(pal_index));
	var palette = paletteNames[pal_index];

	var path = "../infographics/neutral/" + imgName + "/" + palette + imgName +".png";

	console.log(path);
	document.getElementById("image").src = path;

}