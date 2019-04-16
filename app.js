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

//services
weatherApp.service('cityService', function() {
    
    this.city= "Toronto, ON";
});
    


//Home controller
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    })
    
}]);

//Forecast controller

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=1f658061877d3e12cce74211c08c7928",{
        callback: "JSON_CALLBACK"},{get: {method:"JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });
    
    console.log($scope.weatherResult);
    
}]);

