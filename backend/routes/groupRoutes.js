const express = require('express');
const { getGroups, createGroup, joinGroup, deleteGroup } = require('../controllers/groupController');
const router = express.Router();

router.get('/groups', getGroups);
router.post('/create', createGroup);
router.post('/join', joinGroup);
router.delete('/delete', deleteGroup);

module.exports = router;
