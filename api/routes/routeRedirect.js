const express=require('express');
const {redirect}=require('../controllers/redirectController');

const router=express.Router();

router.get('/:id',redirect )


module.exports = router