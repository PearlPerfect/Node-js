const jwt = require("jsonwebtoken")

const handleAuth = (req, res, next) => {
    const headerValue = req.headers.authorization;
    // console.log(headerValue)
    if (!headerValue){return res.status(401).json({ error: 'Access Denied' })}
    const token = headerValue.split(" ")[1]
    jwt.verify(token, 'mySecret', (err, decoded) => {
        // console.log({ decoded }, 'verification is done')
        if (err) return res.status(403).json({ error: 'Invalid Token' })
        req.user = decoded
        next()
    })
}

module.exports = {handleAuth}