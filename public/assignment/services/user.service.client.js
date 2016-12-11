(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUser: findUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            checkLogin: checkLogin
        };
        return api;

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);
        }

        function findUser() {
            var url = "/api/user";
            return $http.get(url);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(user) {
            var url = "/api/user/" + user._id;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
        }

        function login(user) {
            var url = "/api/login";
            return $http.post(url, user);
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url);
        }

        function register(user) {
            var url = "/api/register";
            return $http.post(url, user);
        }

        function checkLogin() {
            var url = "/api/loggedin";
            return $http.get(url);
        }
    }
})();
