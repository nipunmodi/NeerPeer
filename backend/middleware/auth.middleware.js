const admin = require("../config/Firebase")
const user = require("../models/user.models")

const verifyUser = async (req, res, next) => {

    try {
        const  accessToken  = req.headers.authorization.split(' ')[1];
        const decodeValue = await admin.auth().verifyIdToken(accessToken);

        if (decodeValue) {
            const email = decodeValue.email;
            const findUser = await user.findOne({
                email:email,
            })

            if (!findUser) {
                return res.status(400).json({ "message": "No such user exist!" });
            }
            req.user = findUser;
            return next();
        }
        else {
            return res.status(400).json({ "message": "Unauthorized" });
        }
    } catch (error) {
        return res.status(500).json({ "message": "Internal server error" })
    }
}

module.exports = {verifyUser}