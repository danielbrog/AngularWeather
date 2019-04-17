//MODULE
var weatherApp = angular.module('weatherApp',['ngRoute', 'ngResource']);


//Routes
weatherApp.config (function ($routeProvider) {
    
    $routeProvider
    
    .when ('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
        .when ('/forecast/', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    .when ('/forecast/:hours', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
});

//services
weatherApp.service('cityService', function() {
    
    this.city= "Toronto";
});
    


//Home controller
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })
    
}]);

//Forecast controller

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.hours = $routeParams.hours || 3;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=1f658061877d3e12cce74211c08c7928",{
        callback: "JSON_CALLBACK"},{get: {method:"JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.hours });
    
    
    $scope.convertToCelsius = function(degK) {
        return Math.round(degK - 273.15);
    }
    
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);

