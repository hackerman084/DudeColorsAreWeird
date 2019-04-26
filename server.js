const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

var app = express();
app.use(cors()); // enable cors
app.use(express.static('.'))
const router = express.Router();

// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// router.post('/test', (res, req) => {
// 	console.log(req.body);
// 	console.log("REQ.BODY: " + req.body);
// 	console.log("RES");
// })

// app.use("/api", router);

app.listen(8080, function() {
  console.log("A4 Data Server is running at localhost: 8080")
});


app.post('/send', (req, res) => {
	console.log("it worked!");
	console.log(req.body);
	res.send(req.body);
	// var transporter = nodemailer.createTransport({
	//   service: 'gmail',
	//   auth: {
	//     user: 'rebeca.i.guillen@gmail.com',
	//     pass: 'risabel1998'
	//   }
	// });

	// var mailOptions = {
	//   from: 'rebeca.i.guillen@gmail.com',
	//   to: 'asinghal084@gmail.com',
	//   subject: 'Sending Email using Node.js',
	//   text: 'That was easy!'
	// };

	// transporter.sendMail(mailOptions, function(error, info){
	//   if (error) {
	//     console.log(error);
	//   } else {
	//     console.log('Email sent: ' + info.response);
	//   }
	// });
})
