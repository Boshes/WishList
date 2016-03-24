angular.module('WishList').controller('LogoutController',['$scope','$location','APIService',function($scope,$location,APIService){
    $scope.logout = function () {
        APIService.logoutUser()
        .then(function () {
            $location.path('/');
        });
    };
}]);