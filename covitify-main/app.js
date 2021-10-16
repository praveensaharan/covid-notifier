const express = require('express');
var firebase = require('firebase/app');
require('firebase/database');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cons = require('consolidate');
const mainScript = require('./mainScript');

app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

var firebaseConfig = {
	apiKey: 'AIzaSyDEZ6ai06ciBt_8MhpcDiiK0KbQ3cYyQGM',
	authDomain: 'grptalk.firebaseapp.com',
	projectId: 'grptalk',
	storageBucket: 'grptalk.appspot.com',
	messagingSenderId: '335249187317',
	appId: '1:335249187317:web:49bc6b0ecfc5e5985f40bc',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/submit', async function (req, res) {
	console.log(req.body);
	let forminputs = {
		name: req.body.name,
		emailid: req.body.email,
		age: req.body.age,
		pincode: req.body.pincode,
	};
	const timestamp = Date.now();

	db.ref('users/' + timestamp).set(forminputs);
	return res.render('submit');
});

function multiStep() {
	// mainScript.fetchData(331304, 22);
	mainScript.fetchData(110001, 53);
	var newtime = 60000 * 1;
	if (true) {
		setTimeout(multiStep, newtime);
	}
}
// mainScript.fetchData(331304, 53);
multiStep();

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
