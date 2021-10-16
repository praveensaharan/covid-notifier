const request = require('request');
const mailSend = require('./services/mailService');

const state = {
	VaccineAppointments: [],
};

const fetchData = function (pincode, age) {
	console.log('Search Start!!', pincode, age);
	try {
		const Today = new Date();
		let day = new Date();
		day.setDate(Today.getDate() + 2);
		next_dates = [];
		while (day.getTime() >= Today.getTime()) {
			var thedate = `${day.getDate()}-${
				day.getMonth() + 1
			}-${day.getFullYear()}`;
			next_dates.push(thedate);
			day.setDate(day.getDate() - 1);
		}
		next_dates = next_dates.reverse();
		for (let dt = 0; dt < next_dates.length; dt++) {
			const thedate = next_dates[dt];
			const URL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${thedate}`;
			console.log(URL);
			try {
				let options = { json: true };
				var run = 0;
				console.log('url', URL);
				request(URL, options, (error, res, body) => {

					console.log(error);
					console.log(res.statusCode);
					if (error) console.log(`Error ocurred(${res.statusCode})`);

					if (!error && res.statusCode == 200) {
						
						const centers = body.centers;
						// console.log(centers.length);
						for (let index = 0; index < centers.length; index++) {
							console.log("centers.length",centers.length);
							var sessions = centers[index].sessions;
							for (let i = 0; i < sessions.length; i++) {
								const session = sessions[i];
								if (
									(session.min_age_limit <= age) &
									(session.available_capacity > 0)
								) {
									const object = {
										pincode: pincode,
										date: session.date,
										centername: centers[index].name,
										centeraddress: centers[index].address,
										price: centers[index].fee_type,
										availablity: session.available_capacity,
										vaccinetype: session.vaccine,
									};
									state.VaccineAppointments.push(object);
								}
							}
						}
					}
					run++;
					if (run == 3) {
						const the_data = JSON.stringify(
							state.VaccineAppointments
						);

						console.log('Search Done!!');
						console.log(
							'Results found =',
							state.VaccineAppointments.length
						);
						if (state.VaccineAppointments.length > 0) {
							mailSend.mailSend(state.VaccineAppointments);
						}
					}
				});
			} catch (error) {
				console.error(error);
			}
		}
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	fetchData: fetchData,
	data: state.VaccineAppointments,
};
