const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('header',{
    
  })
})


app.listen(3000, () => {
  console.log('Server is running on port 3000')
})