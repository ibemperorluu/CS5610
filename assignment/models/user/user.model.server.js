module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(uid);
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({
            username: username,
            password: password
        });
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: uid
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            );
    }

    function deleteUser(userId) {
        return UserModel
            .remove({_id: uid});
    }
};