const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('./assets'));


userinputdata = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/storeuserdata', (req, res) => {
    const usersubmitdata = req.body.input;
    userinputdata.push(usersubmitdata);
    res.redirect('/display');
});


app.get('/display', (req, res) => {
    const displayuserData = userinputdata.map(json =>
        JSON.parse(json)).map(obj => JSON.stringify(obj, null, 2)).join();
    res.send(displayuserData);
});


app.listen(port, function (err) {
    if (err) {
        console.log("server is running on port but you got" + err);
        return;
    }
    console.log("server is running on port " + port);
})