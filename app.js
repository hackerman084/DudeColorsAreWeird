let colors = [ "ddfb0c7", "aad2e0", "add9a1", "a2ccc0", "8ad2f1", "9796bb", "00beb9", "ddd8ba", "dfb0c7", "eac793", "f1d9ca",
      "d4d4d4", "83b3e3", "a78f8d", "a857aa", "863e85", "23bf0c", "3c3c3c", "1b4c79", "6d6eb9", "0572cd", 
      "423fa8", "5a922d", "b7de55", "32bff2", "0073aa", "30355f", "51692b", "f3d027", "ffab1c", "899390", 
      "845145", "335671", "116160", "69301d", "ff8000", "f9468c", "f80f19", "C91e11", "920000", "aad2e0", 
      "a5b34b", "ddd8ba", "6e746a"];

let colorsChosen = [];
const moods = ["calm", "positive", "trustworthy", "negative", "disturbing", "serious", "playful", "exciting"]
let numChosen = 0;
let tracking = 0;
let finalResults = [];
let init_answers = {};
let form_data = {}
let trial_data = {};
let trial1_startTime;
let trial1_endTime;
let total_time;
let clicks = 0;
let start_time_stamp = "";
let all_data = {};

function hide(id){
  document.getElementById(id).style.display = "none";
}
function show(id, value="block"){
  document.getElementById(id).style.display = value;
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
function getInfo(){
  var q1 = getText("first_name");
  if (!q1 || q1.length === 0){
    return false; 
  }
  console.log("Q1: " +q1);
  init_answers["firstname"] = q1;


  var q2 = getText("last_name");
  if (!q2 || q2.length === 0){
    return false; 
  }
  console.log("Q2: " +q2);
  init_answers["lastname"] = q2;

  var q3 = getText("age");
  if (!q3 || q3.length === 0 || isNaN(parseInt(q3)) ){
    return false; 
  }
  console.log("Q3: " +q3);
  init_answers["age"] = parseInt(q3);

  var q4 = getText("major_occ");
  if (!q4 || q4.length === 0){
    return false; 
  }

  console.log("Q4: " +q4);
  init_answers["major_occ"] = q4;

  var q5 = getRadio("graphic");
  if (!q5){
    return false;
  }
  console.log("Q5: " +q5);
  init_answers["graphic_design_exp"] = q5;

  var q6 = getRadio("artist");
  if (!q6){
    return false;
  }
  console.log("Q6: " +q6);
  init_answers["artist_exp"] = q6;


  return true;
}
function onNextPress(){
  //check if all information is saved
  if (getInfo()){
    //hide form
    hide("intro");
    hide("intro_div");
    hide("error_div");
    show("container");
    trial1_startTime = new Date();
    if (start_time_stamp.length === 0){
      start_time_stamp = trial1_startTime.toUTCString(); //should only be once
    }
    init_answers["start_datetime"] = start_time_stamp;
    all_data["metadata"] = init_answers;
    console.log(trial_data);
  }
  else{
    show("error_div");
  }



}
function reset(){
  let selectedColors = document.querySelectorAll(".selectedSquare");
  let inputColors = document.querySelectorAll(".inputColors");
  for (let i =0; i< 5; i++){
    console.log(selectedColors[i].id);
    let removed = document.getElementById(selectedColors[i].id);
    selectedColors[i].parentNode.removeChild(selectedColors[i])
    removeFromArray(selectedColors[i].id);

  }
}

function next(){
  if (colorsChosen.length === 5){
    document.getElementById("confirmNext").style.display = "block";
    document.getElementById("btnNext").style.display = "none";
    hide("error_div1");
  } else {
    show("error_div1");
  }
}

function confirmYes(){
  let selectedSquare = document.querySelectorAll(".selectedSquare");
  let formDiv = document.getElementById("form");
  for (let i = 0; i < 5 ;i++){
    // console.log(selectedSquare[i]);
    let newInput = document.createElement("input");
    newInput.setAttribute("type", "hidden");
    newInput.setAttribute("colorValue", selectedSquare[i].id.slice(8));
    newInput.setAttribute("id", selectedSquare[i].id.slice(8));
    newInput.setAttribute("class", "inputColors");

    formDiv.appendChild(newInput);
  }
  trial1_endTime = new Date();
  let time = trial1_endTime - trial1_startTime;
  time /= 1000;
  trial1_startTime = new Date();

  //adding results to object
  let results = {};
  results["mood"] = document.getElementById("mood").innerHTML;
  results["colors"] = colorsChosen;
  results["time"] = time;
  results["clicks"] = clicks;

  let trialNum = "trial" +tracking;
  console.log(trialNum + " RESULTS: " +JSON.stringify(results));

  trial_data[trialNum] = results;

  console.log(trial_data);


  if (tracking < 0){
      document.getElementById("btnNext").style.display = "block";
      document.getElementById("confirmNext").style.display = "none";
      reset();
      tracking++;
      document.getElementById("mood").innerHTML = moods[tracking];
      numChosen = 0;
      colorsChosen = [];
      clicks = 0;

  } else {
    // let trial1_endTime = new Date();
    // total_time = trial1_endTime - trial1_startTime;
    // total_time /= 1000;
    // console.log(trial1_startTime);
    // console.log(trial1_endTime);
    // console.log(total_time);
    document.getElementById("confirmNext").style.display = "none";
    document.getElementById("btnSubmit").style.display = "block"; 
  }

}

function confirmCancel(){
  document.getElementById("confirmNext").style.display = "none";
  document.getElementById("btnNext").style.display = "block";
}

function submit(){
  let results = {};
  results["mood"] = document.getElementById("mood").innerHTML;
  results["colors"] = colorsChosen;

  let trialNum = "trial" +tracking;
  console.log(trialNum + " RESULTS: " +results);

  trial_data[trialNum] = results;
  all_data["exp1"] = trial_data;
  var meta = all_data["metadata"];
  var endtime = new Date();
  meta["end_datetime_trial1"] = endtime.toUTCString();
  all_data["metadata"] = meta;
  console.log("TRIAL_DATA: ");
  console.log(all_data);
  window.localStorage.setItem("all_data", JSON.stringify(all_data)); //storing info in local storage


  window.location = "./exp2.html"
  //axios.post("/api/test", results);
}


 function removeFromArray(id){
    var index = colorsChosen.indexOf(id);
    if (index > -1) {
      colorsChosen.splice(index, 1);
    }

 }

function addColor(event){
  clicks++;
  if (numChosen < 5 && !colorsChosen.includes(event.target.id)){
    let fiveColors = document.getElementById("fiveColors");
    let newDiv = document.createElement("div");
    newDiv.id = "selected" + event.target.id;
    newDiv.setAttribute("class", "selectedSquare");
    newDiv.setAttribute("colorValue", event.target.id);

    //this color is being weird
    if (event.target.id == "#ddfb0c7"){
      newDiv.style.background = 'rgb(221, 251, 12)';
    } else {
      newDiv.style.background = event.target.id;
    }

    newDiv.addEventListener("click", remove);
    
    fiveColors.appendChild(newDiv);
    numChosen++;
    colorsChosen.push(event.target.id);
  } 
}

 function remove(event){
  clicks++;
  var id = event.target.id.slice(8);
  var element = document.getElementById(event.target.id);
  element.parentNode.removeChild(element);

  // var inputEl = document.getElementById("input" + event.target.id);
  // inputEl.parentNode.removeChild(inputEl);

  numChosen--;
  removeFromArray(id);
 }

 window.onload=function(){
  document.getElementById("mood").innerHTML = moods[0];
  let squares = document.querySelectorAll(".square");
  
  for (let i = 0; i < 44; i++){
    squares[i].setAttribute("id", "#" + colors[i]);
    squares[i].style.background = "#" + colors[i];
    
    squares[i].addEventListener("click", addColor)
  }

 }