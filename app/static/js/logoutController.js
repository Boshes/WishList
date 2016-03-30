angular.module('WishList').controller('LogoutController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies, APIService){
    $scope.currentUserName = $cookies.get('userName');
    $scope.currentUserId = $cookies.get('userId');
    if($cookies.get('loggedIn')!='true'){
        console.log("invalid access");
        $location.path('/');
    }
    $scope.logout = function () {
        var token = $cookies.get('token');
        console.log("pressed log out button");
        console.log(token);
        APIService.logoutUser(token)
        .then(function (data) {
            if (data.status=='logged out'){
                console.log("about to log out");
                $cookies.put('loggedIn',false);
                $cookies.remove('userName');
                $cookies.remove('userId');
                $cookies.remove('token');
                console.log("out");
                $location.path('/');
            }
        });
    };
}]);