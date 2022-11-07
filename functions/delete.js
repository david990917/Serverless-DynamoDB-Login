const util = require("../helpers/utils/util");
const userDB = require("../helpers/dbHelpers/users");

exports.delete = async (userInfo) => {
    const username = userInfo.username;

    if (!username) {
        return util.buildResponse(401, {
            message: "Username not provided",
        });
    }

    const dynamoUser = await userDB.getUser(username);
    if (!dynamoUser || !dynamoUser.username) {
        return util.buildResponse(401, {
            message: "User not in the system",
        });
    }

    const user = {
        username: username,
    }

    const deleteUserResponse = await userDB.deleteUser(user);
    if (!deleteUserResponse) {
        return util.buildResponse(503, { message: "server error" });
    }
    return util.buildResponse(200, {
        username: username, message: "Successfully delete the user"
    });
}