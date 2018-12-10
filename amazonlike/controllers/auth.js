const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // cookieName = req.get('Cookie').split('=')[0]
    // cookieValue = req.get('Cookie').split('=')[1]
    // eval(cookieName + '=' + cookieValue);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isAuthenticated
    })
}

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false
    });
  };
  

exports.postLogin = (req, res, next) => {
    console.log(req.body.email)
    User.find({email: req.body.email})
    .then(user => {
        console.log(user)
        req.session.user = user;
        res.redirect('/')
    })
    .catch(err => console.log(err));
    req.session.isAuthenticated = true;
    
}

exports.postSignup = (req, res, next) => {};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
}