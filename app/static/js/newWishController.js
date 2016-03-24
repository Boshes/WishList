angular.module('WishList').controller('NewWishController',['$scope','$location','$uibModal','APIService',function($scope,$location,$uibModal,APIService){
var image;
    $scope.imageSearch = function(imagelink){
        console.log(imagelink);
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
        console.log($scope.imagelink);
        APIService.getImages($scope.imagelink)
        .then(function(data){
           $scope.imagelist = data;
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
           })
        });
        // console.log(imagelink);
        // $.ajax({ type: "POST",
        //     url: "/images",
        //     dataType: 'JSON',
        //     contentType: 'application/json;charset=UTF-8',
        //     data: imagelink
        // })
        // .success(function(json) {
        //     console.log(json);
        //     $scope.imagelist = json;
           
            // var modalInstance = $uibModal.open({
            //     templateUrl: '/static/templates/wishgrid.html',
            //     controller: 'WishModal',
            //     size: 'md',
            //     resolve:{
            //         imagelist : function(){
            //             return $scope.imagelist;
            //         }
            //     }
            // });
        // });
    };
    // $scope.saveimage = function(link){
    //     var imagelink = link;
    //     console.log(imagelink);
    //     alert("was clicked: " + imagelink);
    //     return imagelink;
    // }
    
    
    $scope.newWish = function () {
        
        $scope.error = "";
        $scope.disabled = true;
        // get user id
        if($scope.newWishForm.filepath){
            console.log('the file')
            image= $scope.newWishForm.filepath;
        }
        else if($scope.newWishForm.filepath!="" && $scope.newWishForm.url){
            console.log('the link');
            image = image;
        }
        else{
            console.log('nothing');
            image = "";
        }
        console.log(1,image,$scope.newWishForm.title,$scope.newWishForm.description,$scope.newWishForm.status);
        APIService.newWish(1,image,$scope.newWishForm.title,$scope.newWishForm.description,$scope.newWishForm.status)
        .then(function () {
            $location.path('/wishes')
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
}]);

angular.module('WishList').controller('WishModal',function($scope,$uibModalInstance,imagelist){
    
    $scope.imagelist = imagelist;
    console.log($scope.imagelist);
    
    $scope.selectedImage = function(image){
        $scope.selected = image;
        console.log($scope.selected);
        $uibModalInstance.close($scope.selected);
    }
    
    $scope.cancel= function (){
        $uibModalInstance.dismiss();
    };
});