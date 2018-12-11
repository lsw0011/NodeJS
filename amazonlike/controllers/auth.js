const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    }else{
        message = null
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
    })
}

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    }else{
        message = null
    }
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: message
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
            req.flash('error', 'Invalid email or password.')
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
                } else {
                    req.flash('error', 'Invalid email or password.')
                        .then(() => {
                            return res.redirect('/login');
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
                req.flash('error', 'There exists an account associated with that email address');
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