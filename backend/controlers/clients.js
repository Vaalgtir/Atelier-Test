const jwt = require('jsonwebtoken');

const conn = require('../mysqlConfig')

const Error = require('../security_public/error');

exports.createArticle = (req, res, next) => {
    const message = req.body
    console.group(req)
    conn.query('INSERT INTO articles SET ?', message, function (
      error,
      results,
      fields
    ) {
      if (error) {
        return Error.errorManagement(res, 400, error)
      }
      return res.status(201).json({ message: 'Votre message a bien été posté !' })
    })
}

exports.showAll = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP')
    const userId = decodedToken.userId
    conn.query(
      "SELECT * from articles",
      [userId],
      function (error, results, fields) {
        if (error) {
          return Error.errorManagement(res, 400, error)
        }
        return res.status(200).json({ results })
      }
    )
}
 
exports.deleteArticle = (req, res, next) => {
    conn.query(
      'SELECT * FROM articles WHERE articleID=?',
      req.params.id,
      function (error, results, fields) {
        if (error) {
          return res.status(400).json(error)
        }
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP')
        const userId = decodedToken.userId
        const role = decodedToken.role
        const messageId = results[0].userID
        if (userId !== messageId && role !== 'admin') {
          return Error.errorManagement(res, 401, { message: 'Accès non autorisé' })
        }
        conn.query(
          `DELETE FROM articles WHERE articleID=${req.params.id}`,
          req.params.id,
          function (error, results, fields) {
            if (error) {
              return Error.errorManagement(res, 400, error)
            }
            return res
              .status(200)
              .json({ message: 'Votre message a bien été supprimé !' })
          }
        )
      }
    )
}