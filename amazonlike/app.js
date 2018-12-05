const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

const Cart = require('./models/cart')
const User = require('./models/user')



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res, next) => {
    Cart.get((cart) => {
        req.cart = new Cart(cart.price, cart.products);
        next();
    })
});

app.use((req, res, next) => {
    User.find('lukewesterfield')
        .then(user => {
            req.user = new User(user._id, user.name, user.email, user.cart);
            next();
        })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoConnect(() => {
    app.listen(3001)
})