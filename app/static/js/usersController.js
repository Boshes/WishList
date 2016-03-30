angular.module('WishList').controller('UsersController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies, APIService){
    $scope.currentUserName = $cookies.get('userName');
    $scope.currentUserId = $cookies.get('userId');
    if($cookies.get('loggedIn')!='true'){
        console.log("invalid access");
        $location.path('/');
    }
    APIService.getUsers()
    .then(function(data){
        $scope.users = data.users;
    })
    .catch(function(){
        
    });
}]);