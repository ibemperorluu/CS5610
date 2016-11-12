(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);
        vm.websiteId = parseInt($routeParams["wid"]);

        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }

        init();
    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);
        vm.websiteId = parseInt($routeParams["wid"]);
        vm.createPage = createPage;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }

        init();

        function createPage(name, description) {
            var page = {
                _id: (new Date()).getTime(),
                name: name,
                websiteId: vm.websiteId,
                description: description
            };

            PageService
                .createPage(vm.websiteId, page)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });
        }
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = parseInt($routeParams["uid"]);
        vm.websiteId = parseInt($routeParams["wid"]);
        vm.pageId = parseInt($routeParams["pid"]);
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });

            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });
        }

        init();

        function updatePage() {
            PageService.updatePage(vm.page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function deletePage() {
            PageService.deletePage(vm.page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }
})();