const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
require('./models/User');

const app = express();

mongoose.connect(
	keys.mongoUri,
	{ useNewUrlParser: true }
);

//app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./services/passport');

// Note: don't forget to add in production env variables
const PORT = process.env.PORT || 5000;
app.listen(PORT);
