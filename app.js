let colors = [ "ddfb0c7", "aad2e0", "add9a1", "a2ccc0", "8ad2f1", "9796bb", "00beb9", "ddd8ba", "dfb0c7", "eac793", "f1d9ca",
      "d4d4d4", "83b3e3", "a78f8d", "a857aa", "863e85", "23bf0c", "3c3c3c", "1b4c79", "6d6eb9", "0572cd", 
      "423fa8", "5a922d", "b7de55", "32bff2", "0073aa", "30355f", "51692b", "f3d027", "ffab1c", "899390", 
      "845145", "335671", "116160", "69301d", "ff8000", "f9468c", "f80f19", "C91e11", "920000", "aad2e0", 
      "a5b34b", "ddd8ba", "6e746a"];

 let colorsChosen = [];
 const moods = ["calm", "positive", "trustworthy", "negative", "disturbing", "serious", "playful", "exciting"]
 let numChosen = 0;
 let tracking = 1;

function reset(){
  let selectedColors = document.querySelectorAll(".seletedSquare");
  let inputColors = document.querySelectAll(".inputColors");
  for (let i =0; i< 5; i++){
    selectedColors[i].parentNode.removeChild(selectedColors[i])
    inputColors[i].parentNode.removeChild(inputColors[i]);
    removeFromArray(selectedColors[i].id);
  }
}

function next(){
  document.getElementById("confirmNext").style.display = "block";
  document.getElementById("btnNext").style.display = "none";
}

function confirmYes(){
  let selectedSquare = document.querySelectorAll(".selectedSquare");
  let formDiv = document.getElementById("form");
  for (let i =0; i < 5 ;i++){
    console.log(selectedSquare[i].id.slice(8));
    let newInput = document.createElement("input");
    newInput.setAttribute("type", "hidden");
    newInput.setAttribute("colorValue", selectedSquare[i].id.slice(8));
    newInput.setAttribute("id", "input" + selectedSquare[i].id.slice(8));
    newInput.setAttribute("class", "inputColors");

    formDiv.appendChild(newInput);
  }
  if (tracking < 4){
      document.getElementById("btnNext").style.display = "block";
      document.getElementById("confirmNext").style.display = "none";
      reset();
  } else {
    document.getElementById("confirmNext").style.display = "none";
    document.getElementById("btnSubmit").style.display = "block"; 
  }

  tracking++;
}

function confirmCancel(){
  document.getElementById("confirmNext").style.display = "none";
  document.getElementById("btnNext").style.display = "block";
}


 function removeFromArray(id){
    var index = colorsChosen.indexOf(id);
    if (index > -1) {
      colorsChosen.splice(index, 1);
    }

 }

function addColor(event){
  if (numChosen < 5 && !colorsChosen.includes(event.target.id)){
    // document.getElementById("btnSubmit").style.display = "block";
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

    // let newInput = document.createElement("input");
    // newInput.setAttribute("type", "hidden");
    // newInput.setAttribute("value", event.target.id);
    // newInput.setAttribute("id", "input" + event.target.id);

    // formDiv.appendChild(newInput);


  } 
}

 function remove(event){
  var id = event.target.id.slice(8);
  var element = document.getElementById(event.target.id);
  element.parentNode.removeChild(element);

  var inputEl = document.getElementById("input" + event.target.id);
  inputEl.parentNode.removeChild(inputEl);

  numChosen--;
  removeFromArray(id);
 }

 window.onload=function(){
  let squares = document.querySelectorAll(".square");
  
  for (let i = 0; i < 44; i++){
    squares[i].setAttribute("id", "#" + colors[i]);
    squares[i].style.background = "#" + colors[i];
    
    squares[i].addEventListener("click", addColor)
  }

 }