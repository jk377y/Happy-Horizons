const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const navRoutes = require('./navigate');

router.use('/', homeRoutes);
router.use('/navigate', navRoutes);

// for test
//! should be the homepage route
// router.get('/', (req, res) => {
//     res.send('<h1>localhost:5000</h1');
// });

module.exports = router;