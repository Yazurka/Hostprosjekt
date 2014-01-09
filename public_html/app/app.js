var dashboardApp = angular.module('dashboardApp', ['ngRoute']);

dashboardApp.config(function($routeProvider) {
    $routeProvider
            .when('/',
            {
                controller: 'randomController',
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

dashboardApp.controller('randomController', function($scope, factory) {
    $scope.number = [];
    init();
    function init(){
        $scope.number = factory.getNumber();
    }
});

dashboardApp.factory('factory', function(){
    var number =   [{number:19}, {number:12},{number:124},{number:32}];
    var factory = {};
    factory.getNumber = function(){
        return number;
    };
    return factory;
});

