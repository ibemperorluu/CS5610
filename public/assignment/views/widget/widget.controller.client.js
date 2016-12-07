(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.uid = $routeParams.uid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeUrl = checkSafeUrl;

        function init() {
            WidgetService
                .findAllWidgetsForPage(vm.pid)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
        }

        init();

        function checkSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function checkSafeUrl(widget) {
            var urlParts = widget.url.split("=");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.uid = $routeParams.uid;
        vm.createWidget = createWidget;

        function createWidget(type) {
            var widget = {
                type: type.toUpperCase(),
                name: "Example",
                text: "Example"
            };

            WidgetService
                .createWidget(vm.pid, widget)
                .success(function (newWidget) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/"
                        + newWidget._id);
                })
                .error(function (error) {
                    vm.error = "Unable to create the widget";
                });
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.uid = $routeParams.uid;
        vm.wgid = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function (widget) {
                    vm.widget = widget;
                })
        }

        init();

        function updateWidget() {
            WidgetService
                .updateWidget(vm.widget)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function (error) {
                    vm.error = "Unable to edit the desired widget";
                });
        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(vm.wgid)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function (error) {
                    vm.error = "Unable to delete the desired widget";
                });
        }
    }

    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function (widget) {
                    vm.widget = widget;
                })
        }

        init();

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            vm.widget.url = url;
            WidgetService
                .updateWidget(vm.widget)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function (error) {
                    vm.error = "Unable to edit widget";
                });
        }
    }
})();