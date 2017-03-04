import express from 'express';
const app = express();

app.get('/', (req, res)=>res.send('use endpoint/api'))

app.get('/api', (req, res)=>{
    res.send('API works')
})

app.listen(8001, err => console.log(err || `->Listening on 8001`));