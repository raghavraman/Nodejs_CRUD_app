var express = require('express')
  , router = express.Router()


router.get('/', function(req, res) {
    res.json({ message: 'Working perfectly' });
});

// router.use(require('./loginUser'));
router.use(require('./projects'));
router.use(require('./users'));
router.use(require('./tasksEntries'));
router.use(require('./tasks'));
router.use(require('./customers'));

module.exports = router;