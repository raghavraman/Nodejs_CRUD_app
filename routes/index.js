var express = require('express')
  , router = express.Router()


router.get('/',function(req,res) {

    res.redirect('login')

});
router.get('/other',function(req,res) {

    res.render('other')

});

router.get('/login',function(req,res){
	res.render('login');
});

router.get('/dashboard',function(req,res){
	var userName = req.cookies['_at'];
	res.render('profile',{user:userName,activeDash:"active"});
});


router.get('/logout',function(req,res){
	res.clearCookie("_ot");
	res.clearCookie("_at");
	res.redirect('login');
});

// router.use(require('./loginUser'));
router.use(require('./projects'));
router.use(require('./users'));
router.use(require('./tasksEntries'));
router.use(require('./tasks'));
router.use(require('./customers'));
router.use(require('./timetracker'));

module.exports = router;