angular.module('WishList').controller('LoginController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies,APIService){
    if($cookies.get('loggedIn')=='true'){
    $location.path('/home');
    }
    $scope.login = function(){
        $scope.error = "";
        $scope.disabled = true;
        
        APIService.loginUser($scope.loginForm.username, $scope.loginForm.password)
        .then(function (data) {
            if (data.status =='logged'){
                $cookies.put('loggedIn' , true);
                $cookies.put('token' , data.token);
                $cookies.put('userId', data.id);
                $cookies.put('userName' , data.username);
                $location.path('/home');
                $scope.disabled = false;
                $scope.loginForm = {};
            }
        })
        .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
        });
    };
}]);