angular.module('WishList').controller('SignUpController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies,APIService){
    if($cookies.get('loggedIn')=='true'){
    $location.path('/home');
    }
    $scope.signUp = function () {
        
        $scope.error = "";
        $scope.disabled = true;
        APIService.signUpUser($scope.signUpForm.filepath,$scope.signUpForm.firstname,$scope.signUpForm.lastname,$scope.signUpForm.username,$scope.signUpForm.password,$scope.signUpForm.email)
        .then(function () {
            APIService.loginUser($scope.signUpForm.username,$scope.signUpForm.password)
            .then(function (data){
                $cookies.put('loggedIn' , true);
                $cookies.put('token' , data.token);
                $cookies.put('userId', data.id);
                $cookies.put('userName' , data.username);
                $location.path('/home');
                $scope.disabled = false;
                $scope.signUpForm = {};
            })
            .catch(function (err) {
                console.log(err);
                $scope.error = true;
                $scope.errorMessage = "Invalid username and/or password";
                $scope.disabled = false;
                $scope.signUpForm = {};
            });
        });
    };
}]);