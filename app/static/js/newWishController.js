angular.module('WishList').controller('NewWishController',['$scope','$location','$cookies','$uibModal','APIService',function($scope,$location,$cookies,$uibModal,APIService){
    if($cookies.get('loggedIn')!='true'){
        $location.path('/');
    }
    
    var image;
    
    $scope.options = {
        'NotReceieved':0,
       'Received':1
        
    };
    
    $scope.newWish = function () {
        var user = $cookies.get('userId');
        APIService.newWish(user,$scope.url,image,$scope.title,$scope.description)
        .then(function () {
            $location.path('/wishes');
            $scope.newWishForm = {};
        })
        .catch(function () {
            $scope.errorMessage = "Invalid wish";
            $scope.newWishForm = {};
        });
    };

    $scope.imageSearch = function(imagelink){
        if ((imagelink.indexOf('www.')>=0) && !(imagelink.indexOf('http://www.')>=0)){
            $scope.imagelink = "http://" + imagelink;
        }
        else if ((imagelink.indexOf('http://www.')>=0)){
            $scope.imagelink = imagelink;
        }
        else if ((imagelink.indexOf('https://www.')>=0)){
            $scope.imagelink = imagelink;
        }
        else{
            $scope.imagelink = "http://www." + imagelink;
        }
        APIService.getImages($scope.imagelink)
        .then(function(data){
           $scope.imagelist = data.data.thumbnails;
           var modalInstance = $uibModal.open({
               templateUrl: 'static/templates/wishgrid.html',
               controller: 'WishModal',
               size: 'md',
               resolve: {
                   imagelist : function(){
                       return $scope.imagelist;
                   }
               }
           });
           modalInstance.result.then(function(data){
               image = data;
               $scope.image = image;
           });
        });
    };
}]);

angular.module('WishList').controller('WishModal',function($scope,$uibModalInstance,imagelist){
    
    $scope.imagelist = imagelist;
    
    $scope.selectedImage = function(image){
        $scope.selected = image;
        $uibModalInstance.close($scope.selected);
    };
    
    $scope.cancel= function (){
        $uibModalInstance.dismiss();
    };
});