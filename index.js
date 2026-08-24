
const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const cors = require('cors')

const { Pool } = require("pg")

const pg = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

app.use(express.json())

app.use(cors({
  origin: "https://design-30f.pages.dev",
  methods: ["GET", "POST"],
  credentials: true
}));

app.listen(3000, () => {
  console.log('listen and repeat' + 3000)
})

app.get("/", (req, res) => {
  res.redirect("https://design-30f.pages.dev/");
});

app.post('/api/profile', (req, res) => {
  console.log(req.body)
  res.json({
    data: 'get'
  })
})

await pg.query("INSERT INTO users (username, passwordhash) VALUES ($1, $2)", ['bablaka', '3134234'])