//MODULE
var weatherApp = angular.module('weatherApp',['ngRoute', 'ngResource']);


//Routes
weatherApp.config (function ($routeProvider) {
    
    $routeProvider
    
    .when ('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when ('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
});

//serices
weatherApp.service('cityService', function() {
    
    this.city= "New York, NY";
});
    


//Home controller
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })
    
}]);

//Forecast controller

weatherApp.controller('forecastController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
}]);

