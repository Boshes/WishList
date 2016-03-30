angular.module('WishList').controller('UsersController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies, APIService){
    $scope.currentUserName = $cookies.get('userName');
    $scope.currentUserId = $cookies.get('userId');
    if($cookies.get('loggedIn')!='true'){
        $location.path('/');
    }
    APIService.getUsers()
    .then(function(data){
        $scope.users = data.data.users;
    })
    .catch(function(){
        
    });
    
    $scope.seeWishlist = function(userid){
        console.log(userid);
        APIService.getWishes(userid)
        .then(function(data){
            console.log(data);
        })
    }
}]);