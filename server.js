require('dotenv').config()
const express = require ('express')
const cors = require('cors');
const path = require ('path')
const app = express ()

const apiRouter = require('./api/routes/apiRoutes.js')

app.use(express.json());
app.use('/api',apiRouter)
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use('/app', express.static (path.join (__dirname, '/public')))

let port = process.env.PORT || 3000
app.listen (port)