
const express = require('express')
const app = express()
const http = require('http')
const path = require('path')

app.listen(3000, () => {
    console.log('listen and repeat' + 3000)
})

app.get('/', (req, res) => {
    res.send('zxc')
})