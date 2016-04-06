angular.module('WishList').factory('APIService',['$http','$q',function($http,$q){
    return{
        loginUser : function(email,password){
            var deferred = $q.defer();
            $http.post('/api/user/login',{email:email, password:password})
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
            $http.post('/api/user/logout',{token:token})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        signUpUser : function(firstname,lastname,username,password,email){
            var deferred = $q.defer();
            $http.post('/api/user/register',{firstname:firstname,lastname:lastname,username:username,password:password,email:email})
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
            $http.get('/api/users')
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
            $http.get('/api/user/'+userid,{userid: userid})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        newWish : function(userid,url,thumbnail,title,description,status){
            var deferred = $q.defer();
            $http.post('/api/user/'+userid+'/wishlist',{userid:userid,url:url,thumbnail:thumbnail,title:title,description:description,status:status})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getImages : function(url){
            console.log(url);
            var deferred = $q.defer();
            $http.get('/api/thumbnail/process?url='+encodeURI(url))
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
            $http.get('/api/user/'+userid+'/wishlist',{userid:userid})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
                
            });
            return deferred.promise;
        },
        sendWishes : function(emails,subject,message,wishes,userid){
            var deferred = $q.defer();
            $http.post('/api/send/'+userid,{emails:emails,subject:subject,message:message,wishes:wishes,userid:userid})
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