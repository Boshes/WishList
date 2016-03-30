var app = angular.module("WishList",['ngRoute','ngCookies','ui.bootstrap']);

app.run(function($cookies){
    if(!$cookies.get('loggedIn')){
        $cookies.put('loggedIn',false);
    }
});

app.config(function($routeProvider){
    $routeProvider
    .when('/home',{
        templateUrl: 'static/templates/home.html'
    })
    .when('/login',{
        templateUrl: 'static/templates/login.html',
        controller: 'LoginController'
    })
    .when('/logout',{
        templateUrl: 'static/index.html',
        controller: 'LogoutController'
    })
    .when('/signup',{
        templateUrl: 'static/templates/signup.html',
        controller: 'SignUpController'
    })
    .when('/user',{
        templateUrl: 'static/templates/userview.html',
        controller: 'UserViewController'
    })
    .when('/users',{
        templateUrl: 'static/templates/users.html',
        controller: 'UsersController'
    })
    .when('/wish',{
        templateUrl: 'static/templates/newwish.html',
        controller: 'NewWishController'
    })
    .when('/wishes',{
        templateUrl: 'static/templates/wishes.html',
        controller: 'WishesController'
    })
    .otherwise({
        templateUrl: 'static/templates/landing.html',
        redirectTo: '/'
    });
});