const util = require("../helpers/utils/util");
const userDB = require("../helpers/dbHelpers/users");

exports.scan = async () => {

    const scanResponse = await userDB.scanUser();
    try {
        const response = await userDB.scanUser();
        return util.buildResponse(200, { data: response });
    }
    catch (err) {
        return util.buildResponse(500, { message: "server error" });
    }

}