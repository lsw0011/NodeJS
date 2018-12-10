const User = require('../models/user');
const bcrypt = require('bcryptjs');

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
    const email = req.body.email;
    const password = req.body.password;
    console.log(password)
    User.findOne({email: email})
    .then(user => {
        console.log(user)
        if (!user){
            return res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
            .then(match => {
                console.log(match)
                if (match) {
                    req.session.user = user;
                    req.session.isAuthenticated = true;
                    return req.session.save(err => {
                        console.log(err)
                        return res.redirect('/')
                    })
                }
                res.redirect('/login')
            })
            .catch(err => {
                console.log(err);
                res.redirect('/login');
            })
        
    
    })
    .catch(err => console.log(err));    
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword; 
    User.findOne({email: email})
        .then(userDoc => {
            if(userDoc){
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    })
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                })
            
        })
        .catch()
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
}