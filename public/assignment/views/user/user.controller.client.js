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
            var user = UserService.findUserByCredentials(username, password);
            if (user === null) {
                vm.error = "Invalid login credentials. Try again.";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($routeProvider, UserService, $location) {
        var vm = this;
        vm.userId = $routeProvider.userId;
        vm.createUser = createUser;

        function init() {
            vm.users = UserService.findUserById(vm.userId);
        }

        init();

        function createUser(user) {
            user._id = (new Date()).getTime();
            UserService.createUser(user);
            $location.url("/user/" + vm.userId);
        }


    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams["uid"]);
        var user = UserService.findUserById(userId);
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        if (user != null) {
            vm.user = user;
        }

        function updateUser(user) {
            UserService.updateUser(vm.userId, user);
        }

        function deleteUser() {
            UserService.deleteUser(vm.userId);
        }
    }
})();