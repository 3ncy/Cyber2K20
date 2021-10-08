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
app.use(express.static('public'));
app.use("/api/", apiLimit);


/* app.get('/', (req, res) => {

    var userAgent = req.headers.get('User-Agent');
    if(!userAgent) {
        userAgent = "couldnt get user agent";
    }

    var userIP = req.headers.get('X-Forwarded-For');
    if(!userIP) {
        userIP = "couldnt get users IP";
    }

    var userLanguage = req.headers.get('Accept-Language');
    if(!userLanguage) {
        userLanguage = "couldnt get users Language";
    }

    var userEmail = req.headers.get('From');
    if(!userEmail) {
        userEmail = "couldnt get users Email";
    
    }
    connection.execute('INSERT INTO `userData` (userIP, userAgent, userLanguage, userEmail) VALUES (?, ?, ?, ?);', [userIP, userAgent, userLanguage, userEmail], (err) => {
        if(err) throw err;
    });

    res.sendFile(__dirname + "../public/index.html");
}); */

app.use('/', function(res, req, next){
    console.log("STARTED");
    res.status(200).json({hey: true});
    next();
});

app.get('/', function(res, req, next){
    res.sendFile(__dirname + "../public/index.html")
    next();
});

app.use('/', function(res, req){
    console.log("ENDED");
    res.status(200).json({heyend: true});
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

app.listen(3000, () => console.log('App is running on http://127.0.0.1:3000/'));