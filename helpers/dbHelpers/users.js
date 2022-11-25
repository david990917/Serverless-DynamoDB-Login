const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-central-1" });

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const userTable = "user-table";

exports.getUser = async (username) => {
    const params = {
        TableName: userTable,
        Key: {
            username: username,
        },
    };

    return await dynamoDB
        .get(params)
        .promise()
        .then(
            (response) => {
                return response.Item;
            },
            (error) => {
                console.log("Error fetching user", error);
            }
        );
};

exports.saveUser = async (user) => {
    const params = {
        TableName: userTable,
        Key: {
            username: user.username,
        },
        Item: user,
    };

    return await dynamoDB
        .put(params)
        .promise()
        .then(
            (response) => {
                return true;
            },
            (error) => {
                console.log("Error saving user", error);
            }
        );
};

exports.deleteUser = async (user) => {
    const params = {
        TableName: userTable,
        Key: {
            username: user.username,
        },
    };

    return await dynamoDB
        .delete(params)
        .promise()
        .then(
            (response) => {
                return true;
            },
            (error) => {
                console.log("Error deleting user", error);
            }
        );
};

exports.updateUser = async (user) => {
    const params = {
        TableName: userTable,
        Key: {
            username: user.username,
        },
        Item: user,
    };

    return await dynamoDB
        .update(params)
        .promise()
        .then(
            (response) => {
                return true;
            },
            (error) => {
                console.log("Error updating user", error);
            }
        );
};

exports.scanUser = async () => {
    const params = {
        TableName: userTable,
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return data;
    }
    catch (error) {
        return error;
    }


};