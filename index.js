const express = require('express');

const app = express();
let port = process.env.PORT;

if (port == null || port == "") {
    port = 3000;
}

console.log(port)

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
    res.sendFile('./public/about.html', { root: __dirname });
});

app.listen(port);