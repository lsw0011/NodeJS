const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))

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
                    transporter.sendMail({
                        to: email,
                        from: 'shop@nodecomplete.com',
                        subject: 'Signup succeeded!',
                        html: '<h1>You successfully signed up!</h1>'
                    });
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

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    }else{
        message = null
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
    })
}

exports.postReset = (req, res, next) => {
    sendEmail = (callback => {  
        crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({email: req.body.email})
            .exec((err, user) => {
            if(err) return next( err );
            if(!user) {
                req.flash('error', 'No account with that email found.');
                return res.redirect('/reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            user.save()
                .then(() => {
                    callback(token)
                })
                
            })
        })
        
        
    })
    sendEmail(token => {
        res.redirect('/');
        transporter.sendMail({
            to: req.body.email,
            from: 'shop@node-complete.com',
            subject: 'Password Reset',
            html: `
                <p>You requested a password reset</p>
                <p>Click this <a href="http://localhost:4000/reset/${token}">link</a> to set a new password.                
            `
        });
    }) 
    
}

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;

    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
        .exec((err, user) => {
            if(err) return next(err);
            let message = req.flash('error');
            if (message.length > 0) {
                message = message[0]
            }else{
                message = null
            }
            res.render('auth/new-password', {
                path: '/reset-password',
                pageTitle: 'Reset Password',
                errorMessage: message,
                passwordToken: token,
                userId: user._id.toString()
            })
        })
}

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
    User.findOne({
        resetToken: passwordToken, 
        resetTokenExpiration: {$gt: Date.now()}, 
        _id: userId
    }).then(user => {
        resetUser = user
        return bcrypt.hash(newPassword, 12)
    }).then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save()
    }).then(result => {
        res.redirect('/login');
    })
    .catch((err) => {
        console.log(err);
    }) 
}