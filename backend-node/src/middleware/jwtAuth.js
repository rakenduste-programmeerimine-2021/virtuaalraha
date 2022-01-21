// const jwt = require("jsonwebtoken")
const jwt_decoder = require('jwt-decode');

const jwtAuth = (req, res, next) => {
  try {
    console.debug('middleware')
    console.debug(req.headers["authorization"])

    if (!req.headers["authorization"]) throw Error("Access denied");

    const accessToken = req.headers.authorization;
    console.debug('HEADER CHECKED')

    const decoded = jwt_decoder(accessToken, process.env.JWT_SECRET)
    console.debug({jwtInfo: decoded});
   
    req.user = decoded

    next()

  } catch (e) {
    console.debug('middleware')
    return res.status(401).send({ error: e.message })
  } 
}

module.exports = jwtAuth    