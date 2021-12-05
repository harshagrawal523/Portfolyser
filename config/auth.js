module.exports = {
    ensureAuthenticated : function(req,res,next) {
    if(req.isAuthenticated()) {
    return next();
    }
    req.flash('error_msg' , 'please login to view this resource');
    res.redirect('/users/login');
    },
    'googleAuth' : {
        'clientID'      : '67681429585-40ftnlui91blejau42rl680m49qdh9u1.apps.googleusercontent.com',
        'clientSecret'  : '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',
        'callbackURL'   : 'http://127.0.0.1:3100/users/google/callback'
    }
}