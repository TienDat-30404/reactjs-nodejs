const jwt = require('jsonwebtoken')
const authencationMiddleWare = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
        if (err) {
            return res.status(400).json({
                status : "Error",
                message : "Authencation"
            })
        }
        else 
        {
            if(user.idRole == 0)
            {
                next()
            }
            else if(user.idRole == 1)
            {
                return res.status(200).json({
                    message : "You have not permission to delete"
                })
            }
        }

      });
}
module.exports = authencationMiddleWare