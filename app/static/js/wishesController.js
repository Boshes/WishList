angular.module('WishList').controller('WishesController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies, APIService){
    $scope.currentUserName = $cookies.get('userName');
    $scope.currentUserId = $cookies.get('userId');
    if($cookies.get('loggedIn')!='true'){
        console.log("invalid access");
        $location.path('/');
    }
    APIService.getWishes($scope.currentUserId)
    .then(function(data){
        $scope.wishes = data.data.wishes;
    })
    .catch(function(){
        
    });
}]);