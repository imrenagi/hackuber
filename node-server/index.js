require('dotenv').config()

import express from 'express';
const app = express();
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get('/', (req, res)=>res.send('use endpoint/api'))

app.get('/api', (req, res)=>{
    res.send('API works')
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

const PORT = 8001;
app.listen(process.env.PORT||PORT, err => console.log(err || `->Listening on ${process.env.PORT} || PORT`));