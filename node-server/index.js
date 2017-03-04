require('dotenv').config()
import express from 'express';
const app = express();
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
import Uber from 'node-uber';
app.get('/', (req, res)=>res.send('use endpoint/api'))

app.get('/api', (req, res)=>{
    res.send('API works')
})

app.post('/api/sms', (req, res)=>{
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

app.post('/api/webhook', (req, res)=>{
    
})

const uber = new Uber({
  client_id: process.env.UBER_CLIENT_ID,
  client_secret: process.env.UBER_CLIENT_SECRET,
  server_token: process.env.UBER_SERVICE_TOKEN,
  redirect_uri: process.env.REDIRECT_URI,
  name: 'UBERAds',
  language: 'en_US',
  sandbox: true 
});

app.get('/api/login', (req, res)=>{
    const url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
    res.redirect(url);
})

const PORT = 8001;
app.listen(process.env.PORT||PORT, err => console.log(err || `->Listening on ${process.env.PORT} || PORT`));