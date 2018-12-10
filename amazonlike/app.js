const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://luke:ouwOaTJhmBu4W4wm@cluster-71glu.mongodb.net/test?retryWrites=true'


const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session(
    {
      secret: 'my secret', 
      resave: false, 
      saveUninitialized: false, 
      store: store
    }
  )
)

app.use((req, res, next) => {
  User.findById('5c0ac4a819ecb4fe0adb0a42')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
sessions
  .connect(
      MONGODB_URI
    )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'lukewesterfield',
          email: 'lukeswesterfield@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });

