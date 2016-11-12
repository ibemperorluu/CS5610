(function () {
    angular
        .module("jgaDirectives", [])
        .directive("sortable", sortable);

    function sortable($routeParams) {

        function linker(scope, element) {
            var initial = -1;
            var final = 1;

            element.sortable({
                start: function (event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function (event, ui) {
                    final = $(ui.item).index();
                    scope.sortableController.sort($routeParams["pid"], initial, final);
                }
            });
        }

        return {
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: "sortableController"
        }
    }

    function sortableController(WidgetService, $routeParams) {
        var vm = this;
        vm.sort = sort;

        function sort(pageId, initial, final) {
            WidgetService.sort(pageId, initial, final);
        }
    }
})();