angular.module('WishList').controller('UserViewController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies, APIService){
    $scope.currentUserName = $cookies.get('userName');
    $scope.currentUserId = $cookies.get('userId');
    if($cookies.get('loggedIn')!='true'){
        $location.path('/');
    }
    
    APIService.getUser($scope.currentUserId)
    .then(function(data){
        $scope.user = data.data;
    })
    .catch(function(){
        
    });
    
    APIService.getWishes($scope.currentUserId)
    .then(function(data){
        $scope.wishes = data.data.wishes;
        $scope.numWishes = $scope.wishes.length;
    })
    .catch(function(){
        
    });
}]);