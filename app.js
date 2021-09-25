const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const config = require('./config.json');

const app = express();

const connection = mysql.createConnection(config.db);

app.use(express.json());
app.use(cors({origin:'*'}));

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