module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };
    return api;

    function createWebsite(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function(websiteObj){
                model.userModel
                    .findUserById(uid)
                    .then(function(userObj){
                        userObj.websites.push(websiteObj);
                        websiteObj._user = userObj._id;
                        websiteObj.save();
                        return userObj.save();
                    }, function(error){
                        console.log(error);
                    });
            });
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({"_user": uid});
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(wid);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel
            .update(
                {
                    _id: wid
                },
                {
                    name: website.name,
                    description: website.description
                }
            );
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel
            .remove({_id: wid});
    }

    function setModel(_model) {
        model = _model;
    }
};