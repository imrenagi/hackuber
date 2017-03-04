import express from 'express';
const app = express();

app.get('/', (req, res)=>res.send('use endpoint/api'))

app.get('/api', (req, res)=>{
    res.send('API works')
})
const PORT = 8001;
app.listen(process.env.PORT||PORT, err => console.log(err || `->Listening on ${process.env.PORT} || PORT`));