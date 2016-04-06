angular.module('WishList').controller('LogoutController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies, APIService){
    $scope.currentUserName = $cookies.get('userName');
    $scope.currentUserId = $cookies.get('userId');
    if($cookies.get('loggedIn')!='true'){
        $location.path('/');
    }
    
    $scope.logout = function () {
        var token = $cookies.get('token');
        APIService.logoutUser(token)
        .then(function (data) {
            if (data.status=='logged out'){
                $cookies.put('loggedIn',false);
                $cookies.remove('userName');
                $cookies.remove('userId');
                $cookies.remove('token');
                $location.path('/');
            }
        });
    };
}]);