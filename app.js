let colors = [ "ddfb0c7", "aad2e0", "add9a1", "a2ccc0", "8ad2f1", "9796bb", "00beb9", "ddd8ba", "dfb0c7", "eac793", "f1d9ca",
      "d4d4d4", "83b3e3", "a78f8d", "a857aa", "863e85", "23bf0c", "3c3c3c", "1b4c79", "6d6eb9", "0572cd", 
      "423fa8", "5a922d", "b7de55", "32bff2", "0073aa", "30355f", "51692b", "f3d027", "ffab1c", "899390", 
      "845145", "335671", "116160", "69301d", "ff8000", "f9468c", "f80f19", "C91e11", "920000", "aad2e0", 
      "a5b34b", "ddd8ba", "6e746a"];

 let colorsChosen = [];
 const moods = [""]
 let numChosen = 0;
 console.log(colors.length);

 function sendEmail(){
  console.log("sending email");
 //   var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'rebeca.i.guillen@gmail.com',
  //     pass: 'risabel1998'
  //   }
  // });

  // var mailOptions = {
  //   from: 'example@gmail.com',
  //   to: 'rebeca.i.guillen@gmail.com',
  //   subject: 'Sending Email using Node.js',
  //   text: 'That was easy!'
  // };
 }

 function removeFromArray(id){
    var index = colorsChosen.indexOf(id);
    if (index > -1) {
      colorsChosen.splice(index, 1);
    }

    console.log(colorsChosen);
    // for (let i =0; i<5; i++){
    //   if (colorsChosen[i] === id){
    //     colorChosen.splice
    //   }
    // }
 }

 function finalColors(){
  let inputColors = document.querySelectorAll(".square");
  for (let i=0; i < 5; i++){
    inputColors[i].setAttribute("value", colorsChosen[i]);
  }
 }

 function remove(event){
  console.log(event.target.id);
  var id = event.target.id.slice(8);
  console.log(id);
  var element = document.getElementById(event.target.id);
  element.parentNode.removeChild(element);
  numChosen--;
  removeFromArray(id);
 }

 window.onload=function(){
  sendEmail();
  let squares = document.querySelectorAll(".square");
  for (let i = 0; i < 45; i++){
    squares[i].setAttribute("id", "#" + colors[i]);
    squares[i].style.background = "#" + colors[i];
    
    console.log(squares[i]);
    squares[i].addEventListener("click", function(event){
      if (numChosen < 5 && !colorsChosen.includes(event.target.id)){
        let fiveColors = document.getElementById("fiveColors");
        let newDiv = document.createElement("div");
        newDiv.id = "selected" + event.target.id;
        newDiv.setAttribute("class", "square");

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
      if (numChosen == 4){
        // sendEmail();
      }

    })
  }

 }