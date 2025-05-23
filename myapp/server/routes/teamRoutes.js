const express = require('express');
const router = express.Router();
const controllers = require('../controllers/teamController')



router.post('/create-team', controllers.teamController)



module.exports = router;