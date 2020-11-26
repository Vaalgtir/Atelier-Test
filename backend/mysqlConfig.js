const mysql = require('mysql')

// DEV CODE

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'khunou',
  database: 'projet_7',
  port: '330',
  timezone: 'Europe/London',
  insecureAuth : true
})

conn.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + conn.threadId)
})

module.exports = conn