var express = require('express')
  , router = express.Router()


router.get('/',function(req,res) {
    res.render('login')
})
// router.use(require('./loginUser'));
router.use(require('./projects'));
router.use(require('./users'));
router.use(require('./tasksEntries'));
router.use(require('./tasks'));
router.use(require('./customers'));

module.exports = router;