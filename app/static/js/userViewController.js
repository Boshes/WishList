angular.module('WishList').controller('UserViewController',['$scope','$location','$cookies','APIService',function($scope,$location,$cookies, APIService){
    $scope.currentUserName = $cookies.get('userName');
    $scope.currentUserId = $cookies.get('userId');
    if($cookies.get('loggedIn')!='true'){
        console.log("invalid access");
        $location.path('/');
    }
    APIService.getUser($scope.currentUserId)
    .then(function(data){
        $scope.user = data;
        console.log($scope.user);
    })
    .catch(function(){
        
    });
}]);