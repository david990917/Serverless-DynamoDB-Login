const util = require("../helpers/utils/util");
const auth = require("../helpers/utils/auth");
const userDB = require("../helpers/dbHelpers/users");

const bcrypt = require("bcryptjs");

exports.login = async (user) => {
    const username = user.username;
    const password = user.password;

    if (!username || !password) {
        return util.buildResponse(401, {
            messsage: "Username and password is required",
        });
    }

    const dynamoUser = await userDB.getUser(username);
    if (!dynamoUser || !dynamoUser.username) {
        return util.buildResponse(401, { messsage: "username incorrect" });
    }

    if (!bcrypt.compare(password, dynamoUser.password)) {
        return util.buildResponse(401, {
            message: "Password is incorrect",
        });
    }

    const userInfo = {
        username: dynamoUser.username,
        name: dynamoUser.name,
    };

    const token = auth.generateToken(userInfo);

    const response = {
        user: userInfo,
        token: token,
    };
    return util.buildResponse(200, response);
}