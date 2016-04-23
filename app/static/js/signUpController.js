angular.module('WishList').controller('SignUpController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies,APIService){
    if($cookies.get('loggedIn')=='true'){
    $location.path('/home');
    }
    
    $scope.signUp = function () {
        APIService.signUpUser($scope.firstname,$scope.lastname,$scope.username,$scope.password,$scope.email)
        .then(function () {
            APIService.loginUser($scope.email,$scope.password)
            .then(function (data){
                if (data.data.status="logged"){
                    $cookies.put('loggedIn' , true);
                    $cookies.put('token' , data.data.token);
                    $cookies.put('userId', data.data.id);
                    $cookies.put('userName' , data.data.username);
                    $location.path('/home');
                    $scope.disabled = false;
                    $scope.signUpForm = {};
                }
            })
            .catch(function (err) {
                $scope.errorMessage = "Error signing up";
                $scope.signUpForm = {};
            });
        })
    };
}]);