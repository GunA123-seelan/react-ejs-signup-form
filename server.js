const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute=require('./api/routes/index');

mongoose.connect("mongodb+srv://static:static@cluster0.lf80b.mongodb.net/newDB")
.then(res=>console.log("db"))
.catch(err=>console.log(err))

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',userRoute);

// listen on port 3000
app.listen(5000, () => {
  console.log('5000');
});