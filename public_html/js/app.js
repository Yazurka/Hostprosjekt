function init() {
    console.log("init");
    window.init();
}

var statboard = angular.module('statboard', ['ngRoute']);

statboard.config(function($routeProvider) {
    $routeProvider
            .when('/tables',
            {
                controller: 'TabelsCtrl',
                templateUrl: 'partials/tables.html'
            })
            .when('/charts',
            {
                controller: 'ChartsCtrl',
                templateUrl: 'partials/charts.html',
                resolve: {
                    loadData: appCtrl.loadData
        	}
            })
            .otherwise({redirectTo: '/'});
});