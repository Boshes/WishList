angular.module('WishList').factory('APIService',['$http','$q',function($http,$q){
    return{
        loginUser : function(username,password){
            var deferred = $q.defer();
            $http.post('/login',{username: username, password:password})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        logoutUser : function(token){
            var deferred = $q.defer();
            $http.post('/logout',{token:token})
            .success(function(data){
                console.log(data);
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        signUpUser : function(filepath,firstname,lastname,username,password,email){
            var deferred = $q.defer();
            $http.post('/signup',{filepath:filepath,firstname:firstname,lastname:lastname,username:username,password:password,email:email})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
         getUsers : function(){
            var deferred = $q.defer();
            $http.post('/users')
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getUser : function(userid){
            var deferred = $q.defer();
            $http.post('/user/'+userid,{userid: userid})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        newWish : function(userid,url,title,description,status){
            var deferred = $q.defer();
            $http.post('/wish/'+userid,{userid:userid,url:url,title:title,description:description,status:status})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getImages : function(url){
            var deferred = $q.defer();
            $http.post('/api/thumbnail/process',{url:url})
            .success(function(data){
                console.log(data);
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getWishes : function(userid){
            var deferred = $q.defer();
            $http.post('/wishes/'+userid,{userid:userid})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
                
            });
            return deferred.promise;
        }
       
    };
}]);