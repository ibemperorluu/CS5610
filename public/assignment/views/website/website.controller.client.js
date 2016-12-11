(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (error) {

                });
        }

        init();
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (error) {

                });
        }

        init();

        function createWebsite(name, description) {
            if (website.name === undefined) {
                vm.error = "You must input a name for your website.";
            } else {
                var website = {
                    name: name,
                    description: description
                };

                WebsiteService
                    .createWebsite(vm.uid, website)
                    .success(function () {
                        $location.url("/user/" + vm.uid + "/website");
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }
        }
    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .success(function (website) {
                    vm.website = website;
                })
                .error(function () {

                });
        }

        init();

        function updateWebsite() {
            WebsiteService
                .updateWebsite(vm.wid)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website");
                })
                .error(function () {

                });
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.wid)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website");
                })
                .error(function () {

                });
        }
    }
})();