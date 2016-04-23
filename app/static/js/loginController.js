angular.module('WishList').controller('LoginController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies,APIService){
    if($cookies.get('loggedIn')=='true'){
    $location.path('/home');
    }
    
    $scope.login = function(){
        APIService.loginUser($scope.email, $scope.password)
        .then(function (data) {
            if (data.message =='logged'){
                $cookies.put('loggedIn' , true);
                $cookies.put('token' , data.data.token);
                $cookies.put('userId', data.data.id);
                $cookies.put('userName' , data.data.username);
                $location.path('/home');
                $scope.disabled = false;
                $scope.loginForm = {};
            }
            else if(data.message=="not logged"){
                $scope.errorMessage = "Incorrect email or password";
            }
        })
        .catch(function () {
            $scope.errorMessage = "Error logging in";
            console.log($scope.errorMessage);
            $scope.loginForm = {};
        });
    };
}]);