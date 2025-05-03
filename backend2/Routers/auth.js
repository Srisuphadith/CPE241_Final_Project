const express = require('express')
const router = express.Router()

router.get('/login',(req,res)=>{
    res.send('login get')
})

router.post('/login',(req,res)=>{
    const {name} = req.body
    res.send('login post '+ name)
})

module.exports = router