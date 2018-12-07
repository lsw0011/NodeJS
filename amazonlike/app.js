const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user')



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5c0a1a2968eb4d3bb32190bd')
        .then(user => {
            req.user = user;
            next();
        })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose
    .connect(
        'mongodb+srv://luke:ouwOaTJhmBu4W4wm@cluster-71glu.mongodb.net/test?retryWrites=true'
        )
    .then(result => {
        app.listen(8000)
    }).catch(err => {
        console.log(err)
    })