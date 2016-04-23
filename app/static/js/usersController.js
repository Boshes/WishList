angular.module('WishList').controller('UsersController',['$scope','$location','$cookies','$uibModal','APIService',function($scope,$location,$cookies,$uibModal,APIService){
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
        APIService.getWishes(userid)
        .then(function(data){
            if(data.message=="Success"){
                var modalInstance = $uibModal.open({
                    templateUrl : 'static/templates/viewwishes.html',
                    controller : 'ViewWishesModal',
                    size: 'md',
                    animation: true,
                    resolve: {
                        result : function(){
                            return data;
                        }
                    }
                });
            }
        });
    };
}]);

angular.module('WishList').controller('ViewWishesModal',function($scope,$uibModalInstance,result){
    $scope.wishes = result.data.wishes;
    $scope.user = result.data.user;
    
    $scope.ok= function (){
        $uibModalInstance.dismiss();
    };
});