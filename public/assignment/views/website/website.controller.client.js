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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);
        vm.websiteId = parseInt($routeParams["wid"]);
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function createWebsite(website) {
            website._id = (new Date()).getTime();
            website.developerId = vm.userId;
            WebsiteService.createWebsite(website);
            $location.url("/user/" + vm.userId + "/website");
        }
    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);
        vm.websiteId = parseInt($routeParams["wid"]);
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        var website = WebsiteService.findWebsiteById(vm.websiteId);

        if (website != null) {
            vm.website = website;
        }

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(website);
            $location.url("/user/" + vm.userId + "/website");
        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();