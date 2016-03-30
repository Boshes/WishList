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
       
        $scope.error = "";
        $scope.disabled = true;
        APIService.newWish(user,image,$scope.newWishForm.title,$scope.newWishForm.description,$scope.newWishForm.status)
        .then(function () {
            $location.path('/wishes');
            $scope.disabled = false;
            $scope.newWishForm = {};
        })
        .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid wish";
            $scope.disabled = false;
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
           console.log($scope.imagelist);
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
    console.log("on modal");
    console.log($scope.imagelist);
    
    $scope.selectedImage = function(image){
        $scope.selected = image;
        $uibModalInstance.close($scope.selected);
    };
    
    $scope.cancel= function (){
        $uibModalInstance.dismiss();
    };
});