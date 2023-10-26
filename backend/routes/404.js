const {Router} = require('express')

const router = new Router()

router.use((req,res) => {
  res.status(400).json({error: `EndPoint ${req.method} ${req.path} not found`})
})

module.exports = router