angular.module('WishList').controller('SignUpController',['$scope','$location','APIService',function($scope,$location,APIService){
    $scope.signUp = function () {
        
        $scope.error = "";
        $scope.disabled = true;
        APIService.signUpUser($scope.signUpForm.filepath,$scope.signUpForm.firstname,$scope.signUpForm.lastname,$scope.signUpForm.username,$scope.signUpForm.password,$scope.signUpForm.email)
        .then(function () {
            APIService.loginUser($scope.signUpForm.username, $scope.signUpForm.password)
            .then(function (){
                $location.path('/home')
                $scope.disabled = false;
                $scope.signUpForm = {};
            })
            .catch(function () {
                $scope.error = true;
                $scope.errorMessage = "Invalid username and/or password";
                $scope.disabled = false;
                $scope.signUpForm = {};
            });
        });
    };
}]);