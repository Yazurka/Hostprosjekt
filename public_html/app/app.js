var dashboardApp = angular.module('dashboardApp', ['ngRoute']);

dashboardApp.config(function($routeProvider) {
    $routeProvider
            .when('/',
            {
                controller: 'dashController',
                templateUrl: 'app/partials/dashboard.html'
            })
            .when('/tables',
            {
                controller: 'randomController',
                templateUrl: 'app/partials/tables.html'
            })
            .when('/charts',
            {
                controller: 'randomController',
                templateUrl: 'app/partials/charts.html'
            })
            .when('/forms',
            {
                controller: 'randomController',
                templateUrl: 'app/partials/forms.html'
            })
            .otherwise({redirectTo: '/'});
});