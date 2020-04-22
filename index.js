const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
// extract cookie data and assign it to req.session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 *1000,
        keys: [keys.cookieKey],
    })
);

// tell passport to use cookie to manage authentication
// pulls user id out of cookie data
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Serve main.js, main.css when req is looking for specific file
    app.use(express.static('client/build'));

    // Serve index.html when route is not recognized
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);