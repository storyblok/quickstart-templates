'use strict'

const express = require('express')
const app = express()

app.use('/public', express.static('public'))

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(process.env.PORT || 8080, function() {
  console.log('Example app listening on port 8080!')
})