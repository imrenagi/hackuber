require('dotenv').config()
import express from 'express';
const app = express();
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
import Uber from 'node-uber';
import unirest from 'unirest';

app.get('/', (req, res)=>res.send('use endpoint/api'))
let DB = {};

app.get('/api', (req, res)=>{
    res.send(`<a href='${process.env.BASE_URI}/api/login'><button>Login with Uber</button></a>`)
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
        // successful
        console.log(`send message to ${receiver_num}`)
        res.status(200).send('message sent')
    })
})

app.get('/api/success', (req, res) => {
    DB.usercode = req.query.code;
    console.log('DB:', DB);
    res.send({success: true})
})

app.post('/api/success', (req, res) => {
    DB.usercode = req.query.code;
    console.log('DB:', DB);
    res.send({success: true})
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

app.get('/api/login', (req, res)=>{
    const url = uber.getAuthorizeUrl(['history','profile', 'request', 'places', 'all_trips', 'request']);
    res.redirect(url);
})

const PORT = 8001;
app.listen(process.env.PORT||PORT, err => console.log(err || `->Listening on ${process.env.PORT} || PORT`));