const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const config = require('./config.json');
const rateLimit = require('express-rate-limit');

const app = express();

const connection = mysql.createConnection(config.db);

const apiLimit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 7
});

app.use(express.json());
app.use(cors({origin:'*'}));
app.use("/api/", apiLimit);

app.get('/', (req, res) => {

    var send = true;

    var userIP = req.get('X-Forwarded-For');
    if(!userIP) {
        userIP = "couldnt get users IP";
        send = false;
    }

    var userAgent = req.get('User-Agent');
    if(!userAgent) {
        userAgent = "couldnt get user agent";
    }

    var userLanguage = req.get('Accept-Language');
    if(!userLanguage) {
        userLanguage = "couldnt get users Language";
    }

    var userReferer = req.get('Referer');
    if(!userReferer) {
        userReferer = "user accessed it directly";
    }

    var today = new Date;
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = (today.getHours()+2) + ":" + today.getMinutes() + ":" + today.getSeconds();
    var userDate = date+' '+time;

    if(send) {
        connection.execute('INSERT INTO `userData` (userIP, userAgent, userLanguage, userReferer, userDate) VALUES (?, ?, ?, ?, ?);', 
        [userIP, userAgent, userLanguage, userReferer, userDate], (err) => {
            if(err) throw err;
        });
    }
    
    res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static('public'));

app.post('/api/getData', (req, res) => {

    var userIP = req.get('X-Forwarded-For');
    if(!userIP) {
        userIP = "couldnt get users IP";
    }

    var userAgent = req.get('User-Agent');
    if(!userAgent) {
        userAgent = "couldnt get user agent";
    }

    var userLanguage = req.get('Accept-Language');
    if(!userLanguage) {
        userLanguage = "couldnt get users Language";
    }

    var userReferer = req.get('Referer');
    if(!userReferer) {
        userReferer = "user accessed it directly";
    }

    var today = new Date;
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = (today.getHours()+2) + ":" + today.getMinutes() + ":" + today.getSeconds();
    var userDate = date+' '+time;

    connection.execute('INSERT INTO `userDataWithMore` (userDate, userIP, userAgent, userLocation, userLanguage, userReferer, userResolution, userLoadTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', 
    [userDate, userIP, userAgent, req.body.userLocation, userLanguage, userReferer, req.body.userResolutionScreen, req.body.userLoadTime], (err) => {
        if(err) throw err;
    });
});

app.post('/api/form/post', (req, res) => {

    if(!req.body.username || req.body.username === "" || !req.body.message || req.body.message === "" || !req.body.email || req.body.email === "" || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(req.body.email)) {
        return res.status(400).json({error: 'Invalid Body'});
    }

    connection.execute('INSERT INTO `contactForm` (email, username, content) VALUES (?, ?, ?);', [req.body.email, req.body.username, req.body.message], (err) => {
        if (err) return res.status(500).json({error: 'Internal Server Error'});
    });

    return res.status(200).json({success: true});
});

app.post('/api/cookie', (req, res) => {

    var sendCookie = true;

    var userIPcookie = req.get('X-Forwarded-For');
    if(!userIPcookie) {
        userIPcookie = "couldnt get users IP";
        sendCookie = false;
    }

    if(sendCookie) {
        connection.execute('INSERT INTO `cookieTime` (userIPcookie, timeClicked) VALUES (?, ?);', [userIPcookie, req.body.timeClicked], (err) => {
            if (err) return res.status(500).json({error: 'Internal Server Error'});
        });
    }
});

app.listen(3000, () => console.log('App is running on http://127.0.0.1:3000/'));
