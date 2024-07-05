const jwt = require('jsonwebtoken');

const jwtToken = ({user_id, user_login}) =>{
    const user = {user_id, user_login};
    const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '1h'
    });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    })
    return {accesToken, refreshToken}
}

module.exports = { jwtToken }