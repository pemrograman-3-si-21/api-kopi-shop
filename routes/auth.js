const router = require('express').Router()
const controller = require('../controller/auth')

router.post('/registrasi', controller.registrasiUser)
router.post('/login', controller.loginuser)

module.exports = router