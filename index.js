
const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const cors = require('cors')

const { Pool } = require("pg")
const { fail } = require('assert')

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
  res.redirect("https://design-30f.pages.dev/registration");
});

app.get("/profile/:id", async (req, res) => {
  const id = req.params.id
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  res.json({
    result: result.rows[0]
  })
})

app.post('/api/profile/', (req, res) => {
  console.log(req.body)
  res.json({
    data: 'get'
  })
})

app.post('/api/registration', async (req, res) => {
  const { username, password } = req.body

  if (username.length >= 12 && username.length <= 20 && password.length >= 8 && password.length <= 22) {
    const result = await pg.query('SELECT * FROM users WHERE username = $1', [username])

    if (result.rows.length > 0) {
      res.json({
        fail: 'user already exists'
      })
    } else {
      await pg.query('INSERT INTO users (username, passwordhash) VALUES ($1, $2)', [username, password])
      const getid = await pg.query('SELECT * FROM users WHERE username = $1', [username])

      res.json({
        id: getid.rows[0].id,
        redirect: true
      })
    }
  }
})
