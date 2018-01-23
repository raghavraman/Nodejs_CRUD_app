passport.use('local', new LocalStrategy({

        usernameField: 'username',

        passwordField: 'password',

        passReqToCallback: true //passback entire req to call back
    }, function(req, username, password, done) {


        if (!username || !password) { return done(null, false, req.flash('message', 'All fields are required.')); }

        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';

        connection.query("select * from users where username = ?", [username], function(err, rows) {

            console.log(err);
            console.log(rows);

            if (err) return done(req.flash('message', err));

            if (!rows.length) { return done(null, false, req.flash('message', 'Invalid username or password.')); }

            if (passwordHash.verify(password, results[0].password)) {

                return done(null, rows[0]);

            } else {
                return done(null, false, req.flash('message', 'Invalid username or password.'));
            }

        });

    }

));

passport.serializeUser(function(user, done) {

    done(null, user.id);

});

passport.deserializeUser(function(id, done) {

    connection.query("select * from users where id = " + id, function(err, rows) {

        done(err, rows[0]);

    });

})