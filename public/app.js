/**
 * Created by Dustin on 9/29/2016.
 */
(function () {
    angular
        .module('TodoApp', [])
        .controller('TodoController', TodoController);

    function TodoController($scope, $http) {
        $scope.tasks = [];

        $http.get('/tasks')
            .success(function(tasks) {
                $scope.tasks = tasks;
            })

        $scope.updateTask = function() {
            $scope.tasks[$scope.selectedTaskIndex].name = $scope.name;
        }

        $scope.selectTask = function(index) {
            $scope.name = $scope.tasks[index].name;
            $scope.selectedTaskIndex = index;
        }

        $scope.deleteTask = function(index) {
            console.log('remove ' + index);
            $scope.tasks.splice(index, 1);
        }

        $scope.newTask = function() {
            console.log('newTask: ' + $scope.name);

            /*var task = {
                name: $scope.name
            };*/

            $http.get('/task/' + $scope.name)
                .success(function(tasks) {
                    $scope.tasks = tasks;
                })
            //$scope.tasks.push(task);
        }
    }
})();