angular.module('WishList').controller('LoginController',['$scope','$location','APIService',function($scope,$location,APIService){
    $scope.login = function(){
        $scope.error = ""
        $scope.disabled = true;
        
        APIService.loginUser($scope.loginForm.username, $scope.loginForm.password)
        .then(function () {
            $location.path('/home');
            $scope.disabled = false;
            $scope.loginForm = {};
        })
        .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
        });
    };
}]);