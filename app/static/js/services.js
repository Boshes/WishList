angular.module('WishList').factory('APIService',['$http','$q',function($http,$q){
    var user = null;
    
    return{
        isLoggedIn : function(){
            if (user){
                return true;
            }
            else{
                return false;
            }
        },
        loginUser : function(username,password){
            var deferred = $q.defer();
            $http.post('/login',{username: username, password:password})
            .success(function(data){
                if (status ==200 && data.result){
                    user = true;
                    deferred.resolve();
                }
                else{
                    user = false;
                    deferred.reject();
                }
            })
            .error(function(err){
                user = false
                deferred.reject(err);
            })
            return deferred.promise;
        },
        logoutUser : function(){
            var deferred = $q.defer();
            $http.post('/logout')
            .success(function(data){
                user = false;
                deferred.resolve(data);
            })
            .error(function(err){
                user = false
                deferred.reject(err);
            })
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
            })
            return deferred.promise;
        },
        getUserStatus : function(){
            $http.get('/status')
            .success(function(data){
                if (data.status){
                    user = true;
                }
                else{
                    user = false;
                }
            })
            .error(function (data){
                user = false;
            });
        },
        newWish : function(userid,filepath,title,description,status){
            var deferred = $q.defer();
            $http.post('/wish/'+userid,{userid:userid,filepath:filepath,title:title,description:description,status:status})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            })
            return deferred.promise;
        },
        getImages : function(url){
            var deferred = $q.defer();
            $http.post('/images', {url:url})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            })
            return deferred.promise;
        },
        getusers : function(users){
            var deferred = $q.defer();
            $http.post('/users',{'users': users})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            })
            return deferred.promise;
        },
        getuser : function(userid){
            var deferred = $q.defer();
            $http.post('/user/'+userid,{'userid': userid})
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            })
            return deferred.promise;
        }
    }
}]);