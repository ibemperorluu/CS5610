(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }

        init();
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }

        init();

        function createWebsite(name, description) {
            var website = {
                _id: (new Date()).getTime(),
                name: name,
                developerId: vm.userId,
                description: description
            };

            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                });
        }
    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);
        vm.websiteId = parseInt($routeParams["wid"]);
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (website) {
                    vm.website = website;
                });
        }

        init();

        function updateWebsite() {
            WebsiteService.updateWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();