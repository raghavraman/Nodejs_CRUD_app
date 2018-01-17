var express = require('express')
  , router = express.Router()


router.get('/', function(req, res) {
    res.json({ message: 'Working perfectly' });
});

router.use(require('./loginUser'));
// router.use(require('./project'));
// router.use(require('./user'));
// router.use(require('./tasksEntries'));
// router.use(require('./tasks'));
// router.use(require('./customer'));

module.exports = router;