
const express = require('express')
const app = express()
const http = require('http')
const path = require('path')

app.use(express.json())

app.listen(3000, () => {
    console.log('listen and repeat' + 3000)
})

app.get("/", (req, res) => {
  res.redirect("https://design-30f.pages.dev/");
});

app.post('backend2-production-046d.up.railway.app/api/profile/', (req, res) => {
    console.log(req.body)
    res.json({
        data: 'get'
    })
})