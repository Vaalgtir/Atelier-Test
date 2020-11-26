const mysql = require('mysql')

// DEV CODE

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '',
  port: '3306',
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