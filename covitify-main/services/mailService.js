const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemplate');

state = {
	template_data: [],
};

const result = (the_data) => {
	console.log('Results found =', the_data.length);
	for (let index = 0; index < the_data.length; index++) {
		const element = the_data[index];
		state.template_data.push(
			` <ul
		            style="
		                list-style: none;
		                background-color: #00aeff71;
		                border-radius: 5px;
		                padding: 10px 20px;
		                font-weight: bold;
		                color: #363b41;
		                margin: 10px 0px;
		                font-size: 14px;
		            "
		        >

		        <li style="

		"><div  style="
		        color: #ff7e00;
		        font-size: 15px;
		        width: 120px;
		        margin-right: 0px;
		        display: inline-block;">
		        Availablity</div>${element.availablity} </li>
		        <li style="

		"><div style="
		        color: #ff7e00;
		        font-size: 15px;
		        width: 120px;
		        margin-right: 0px;
		        display: inline-block;">
		        Date</div>${element.date}</li>
		        <li style="

		"><div style="
		        color: #ff7e00;
		        font-size: 15px;
		        width: 120px;
		        margin-right: 0px;
		        display: inline-block;">
		        Center Name</div>${element.centername}</li>
		        <li style="

		"><div style="
		        color: #ff7e00;
		        font-size: 15px;
		        width: 120px;
		        margin-right: 0px;
		        display: inline-block;">
		        Center Address</div>${element.centeraddress}</li>
		        <li style="

		"><div style="
		        color: #ff7e00;
		        font-size: 15px;
		        width: 120px;
		        margin-right: 0px;
		        display: inline-block;">
		        Pincode</div>${element.pincode}</li>
		        <li style="

		"><div style="
		        color: #ff7e00;
		        font-size: 15px;
		        width: 120px;
		        margin-right: 0px;
		        display: inline-block;">
		        Vaccine Type</div>${element.vaccinetype}</li>
		        <li style="

		"><div style="
		        color: #ff7e00;
		        font-size: 15px;
		        width: 120px;
		        margin-right: 0px;
		        display: inline-block;">
		        Price</div>${element.price}</li>
		        </ul>`
		);
	}
};

const mailSend = (data) => {
	result(data);
	console.log('Sending mail!!');
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'naveen002564@gmail.com',
			pass: '9413604001',
		},
	});

	var mailOptions = {
		from: 'naveen002564@gmail.com',
		to: 'saharan.nvn@gmail.com',
		subject: 'Sending from covitify',
		// text: state.template_data.join(' '),
		html: emailTemplate(state.template_data),
	};
	// transporter.sendMail(mailOptions, function (error, info) {
	// 	if (error) {
	// 		console.log(error);
	// 	} else {
	// 		console.log('Email sent: ' + info.response);
	// 	}
	// });
};

module.exports = {
	mailSend: mailSend,
};
