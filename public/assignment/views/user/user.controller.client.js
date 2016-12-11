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

        function register(username, password, verifyPassword) {
            if (password != verifyPassword) {
                vm.error = "Invalid password.";
            } else {
                UserService
                    .findUserByUsername(username)
                    .success(function (user) {
                        if (user === '0') {
                            UserService
                                .createUser(username, password)
                                .success(function (user) {
                                    $location.url("/user/" + user._id);
                                })
                                .error(function (error) {
                                    vm.alert = error;
                                });
                        } else {
                            vm.error = "This username already exists! Try again.";
                        }
                    })
                    .error(function (error) {
                        console.log(error);
                    });

            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.logout = logout;

        function init() {
            UserService
                .findUserById(vm.uid)
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
            UserService
                .updateUser(vm.user)
                .success(function (user) {
                    if (user != '0') {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (error) {

                });
        }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {

                });
        }
    }
})();