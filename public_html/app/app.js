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
            .otherwise({redirectTo: '/'});
});

dashboardApp.controller('randomController', function($scope, factory) {
    $scope.customers = [];
});

