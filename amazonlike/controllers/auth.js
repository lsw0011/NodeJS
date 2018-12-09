exports.getLogin = (req, res, next) => {
    cookieName = req.get('Cookie').split('=')[0]
    cookieValue = req.get('Cookie').split('=')[1]
    eval(cookieName + '=' + cookieValue);
    console.log(cookieName)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
    })
}

exports.postLogin = (req, res, next) => {
    
    res.setHeader('Set-Cookie', 'isAuthenticated=true')
    res.redirect('/')
} 