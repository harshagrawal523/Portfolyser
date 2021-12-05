module.exports = {
    ensureAuthenticated : function(req,res,next) {
    if(req.isAuthenticated()) {
    return next();
    }
    req.flash('error_msg' , 'please login to view this resource');
    res.redirect('/users/login');
    },
    'googleAuth' : {
        'clientID'      : 'your-client-ID',
        'clientSecret'  : 'your-client-secret',
        'callbackURL'   : 'http://127.0.0.1:3100/users/google/callback'
    }
}