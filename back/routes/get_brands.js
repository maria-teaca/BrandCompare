const express = require('express')
const router = express.Router()

const brandInfo = require('../services/brands')

router.post('/', brandInfo.getBrands)

module.exports = router