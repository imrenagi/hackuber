require('dotenv').config()
import express from 'express';
import path from 'path';
const app = express();
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
import Uber from 'node-uber';
import unirest from 'unirest';

app.get('/', (req, res)=>res.send('use endpoint/api'))

let DB = {};
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/api', (req, res)=>{
    res.render('login');
})

app.get('/api/sms', (req, res)=>{
    const receiver_num = req.query.number;
    const receiver_name = req.query.name;
    twilio.sendMessage({
        to: receiver_num,
        from: process.env.TWILIO_NUMBER,
        body: `Hi ${receiver_name}`
    }, function(err, good){
        if (err) {
            console.log('err when send twilio SMS: ', err);
            return res.status(500).send('fail to send')
        }
        console.log(`send message to ${receiver_num}`)
        res.status(200).send('message sent')
    })
})

const uber = new Uber({
  client_id: process.env.UBER_CLIENT_ID,
  client_secret: process.env.UBER_CLIENT_SECRET,
  server_token: process.env.UBER_SERVICE_TOKEN,
  redirect_uri: process.env.BASE_URI+'/api/success',
  name: 'UBERAds',
  language: 'en_US',
  sandbox: true
});

app.get('/api/login', (req, res) => {
    const url = uber.getAuthorizeUrl(['history','profile', 'request', 'places', 'all_trips', 'request']);
    res.redirect(url);
});

app.get('/api/success', (req, res) => {
    const userCode = req.query.code;
    uber.authorization({
     authorization_code: userCode
   }, (err, access_token, refresh_token) => {
     if (err) {return console.error(err);}
     console.log('access_token:',access_token)
     console.log('refresh_token:',refresh_token)
     DB.access_token = access_token;
     DB.refresh_token = refresh_token;
     res.send({DB})
   });
});

app.get('/api/user', (req, res) => {
     res.send({DB})
});

app.get('/api/profile', (req, res) => {
    let request = unirest("GET", "https://api.uber.com/v1.2/me");

    request.headers({
    "authorization": `Bearer ${DB.access_token}`,
    "content-type": "application/json"
    });

    request.end(function (response) {
        if (response.error) throw new Error(res.error);
        res.send(response.body)
    });

});

const PORT = 8001;
app.listen(process.env.PORT||PORT, err => console.log(err || `->Listening on ${process.env.PORT || PORT}`));