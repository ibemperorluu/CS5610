(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .success(function (user) {
                    if (user === '0') {
                        vm.error = "Invalid login credentials. Try again.";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (msg) {
                    vm.alert = msg;
                });
        }
    }


    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password) {
            UserService
                .createUser(username, password)
                .success(function (user) {
                    $location.url("/user/" + user._id);
                })
                .error(function (error) {
                    vm.alert = error;
                })
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams["uid"]);
        vm.updateUser = updateUser;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function (msg) {
                    vm.error = msg;
                });
        }

        init();

        function updateUser() {
            UserService.updateUser(vm.user);
        }
    }
})();