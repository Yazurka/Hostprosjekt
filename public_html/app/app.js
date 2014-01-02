var dashboardApp = angular.module('dashboardApp', ['ngRoute']);

dashboardApp.config(function($routeProvider) {
    $routeProvider
            .when('/',
            {
                controller: 'randomController',
                templateUrl: 'app/partials/default.html'
            })
            .when('#/info',
            {
                controller: 'randomController',
                templateUrl: 'app/partials/default.html'
            })
            .when('/dashboard',
            {
                controller: 'randomController',
                templateUrl: 'app/partials/dashboard.html'
            })
            .when('/charts',
            {
                controller: 'randomController',
                templateUrl: 'app/partials/charts.html'
            })
            .when('/tables',
            {
                controller: 'randomController',
                templateUrl: 'app/partials/tables.html'
            })
            .otherwise({redirectTo: '/'});
});

dashboardApp.controller('randomController', function($scope) {
    $scope.customers = [];
});

