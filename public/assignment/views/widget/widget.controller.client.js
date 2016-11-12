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
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeUrl = checkSafeUrl;

        function init() {
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
        }

        init();

        function checkSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function checkSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.websiteId = parseInt($routeParams["wid"]);
        vm.pageId = parseInt($routeParams["pid"]);
        vm.userId = parseInt($routeParams["uid"]);
        vm.createWidget = createWidget;

        function createWidget(type) {
            var widget = {
                _id: (new Date()).getTime(),
                widgetType: type,
                pageId: vm.pageId,
                size: null,
                text: "Your Text",
                width: null,
                url: null
            };

            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"
                        + widget._id);
                })
                .error(function (error) {
                    vm.error = "Unable to create the widget";
                });
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
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                })
        }

        init();

        function updateWidget() {
            WidgetService
                .updateWidget(vm.widget)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function (error) {
                    vm.error = "Unable to edit the desired widget";
                });
        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function (error) {
                    vm.error = "Unable to delete the desired widget";
                });
        }
    }
})();