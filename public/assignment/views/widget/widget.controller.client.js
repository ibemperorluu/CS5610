(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.websiteId = parseInt($routeParams["wid"]);
        vm.pageId = parseInt($routeParams["pid"]);
        vm.userId = parseInt($routeParams["uid"]);
        vm.widgetId = parseInt($routeParams["wgid"]);
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split("/");
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.websiteId = parseInt($routeParams["wid"]);
        vm.pageId = parseInt($routeParams["pid"]);
        vm.userId = parseInt($routeParams["uid"]);
        vm.widgetId = parseInt($routeParams["wgid"]);
        vm.createWidget = createWidget;

        function createWidget(type) {
            vm.widgetId = (new Date()).getTime();

            if (type === "Header") {
                vm.widget = {
                    _id: vm.widgetId,
                    widgetType: "HEADER",
                    pageId: vm.pageId,
                    size: 2,
                    text: ""
                };
            } else if (type === "Image") {
                vm.widget = {
                    _id: vm.widgetId,
                    widgetType: "IMAGE",
                    pageId: vm.pageId,
                    width: "100%",
                    url: ""
                };
            } else if (type === "YouTube") {
                vm.widget = {
                    _id: vm.widgetId,
                    widgetType: "YOUTUBE",
                    pageId: vm.pageId,
                    width: "100%",
                    url: ""
                };
            }
            WidgetService.createWidget(vm.widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" +
                vm.widgetId);
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.websiteId = parseInt($routeParams["wid"]);
        vm.pageId = parseInt($routeParams["pid"]);
        vm.userId = parseInt($routeParams["uid"]);
        vm.widgetId = parseInt($routeParams["wgid"]);
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function updateWidget(widget) {
            WidgetService.updateWidget(widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function deleteWidget(widgetId) {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();