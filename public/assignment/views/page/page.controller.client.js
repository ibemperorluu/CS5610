(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.wid)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {

                });
        }

        init();
    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createPage = createPage;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.wid)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }

        init();

        function createPage(name, title) {
            var page = {
                name: name,
                title: title
            };

            if (page.name === undefined || page.name.length < 1) {
                vm.error = "Name cannot be blank.";
            } else {
                PageService
                    .createPage(vm.wid, page)
                    .success(function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                    })
                    .error(function (error) {

                    });
            }
        }
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.wid)
                .success(function (pages) {
                    vm.pages = pages;
                });

            PageService
                .findPageById(vm.pid)
                .success(function (page) {
                    vm.page = page;
                });
        }

        init();

        function updatePage() {
            PageService
                .updatePage(vm.page)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                })
                .error(function () {

                });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pid)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                })
                .error(function () {

                });
        }
    }
})();