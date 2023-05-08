const router = require('express').Router();

const loginRoutes = require('./login');
const logoutRoutes = require('./logout');

router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);

router.get('/', (req, res) => {
    res.send('<h1>localhost:5000/navigate</h1');
});



module.exports = router;