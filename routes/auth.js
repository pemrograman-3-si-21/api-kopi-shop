const router = require('express').Router()
const controller = require('../controller/auth')

router.post('/registrasi', controller.registrasiUser)

module.exports = router