const util = require("../helpers/utils/util");
const userDB = require("../helpers/dbHelpers/users");
const bcrypt = require("bcryptjs");

exports.update = async (userInfo) => {
    const username = userInfo.username;
    const newPassword = userInfo.newPassword;;

    if (!username || !newPassword) {
        return util.buildResponse(401, {
            message: "All fields are required",
        });
    }

    const dynamoUser = await userDB.getUser(username);
    if (!dynamoUser || !dynamoUser.username) {
        return util.buildResponse(401, {
            message: "User not in the system",
        });
    }

    const encryptedPassword = bcrypt.hashSync(newPassword.trim(), 10);
    const user = {
        username: username,
        name: dynamoUser.name,
        password: encryptedPassword,
    }

    const updateUserResponse = await userDB.updateUser(user);
    if (!updateUserResponse) {
        return util.buildResponse(503, { message: "server error" });
    }

    return util.buildResponse(200, { username: username, message: "Successfully update the password" });
}