const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname,'/public')));

app.use('/', (req, res, next) => {
    res.render('home.ejs', {test: 'test'});
})




app.listen(3000, () => {
    console.log('connected to port 3000')
})