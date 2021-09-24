const express = require('express');

const app = express()

app.get('/api', (req, res) => {
    res.status(200).send('ahoj');
})

app.listen(3000, () => console.log('App is running on http://127.0.0.1:3000/'));