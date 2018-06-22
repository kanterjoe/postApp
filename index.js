var bodyParser = require('body-parser')
const express = require('express')
const app = express()
var PORT = process.env.PORT || 3000;

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use( bodyParser.urlencoded({ extended: false }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

const texts = [];
app.post('/texts', (req, res) => {
    
    if (req.body.text) {
        texts.push(req.body.text);
        console.log("success")
        res.send(req.body);

    }
    else {
        res.send(400);

    }


})
app.get('/', (req,res)=>{
     res.sendFile('./index.html', { root: __dirname });
})
app.get('/texts', (req,res)=>{
    console.log(texts);
    let ps = texts.map(i=>`<p>${i}</p><hr>`)

    let textText = ps.reduce ((acc, item) =>{
        return `${acc} ${item}`
    },'')




    res.send(`<h1>Texts from the class:</h2>
        ${textText}
        `); 
})

app.listen(PORT, () => console.log('Example app listening on port 3000!'))