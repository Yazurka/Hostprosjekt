function init() {
    console.log("init");
    window.init();
}

var statboard = angular.module('statboard', ['ngRoute']);

statboard.config(function($routeProvider) {
    $routeProvider
            .when('/',{
                controller: 'DashboardCtrl',
                templateUrl: 'partials/dashboard.html',
                resolve : {
                    getNewHits: dashCtrl.getNewHits,
                    getBounce: dashCtrl.getBounce,
                    getReturning: dashCtrl.getReturning, 
                    getPageNav: dashCtrl.getPageNav,
                    getBouncRateOnPage : dashCtrl.getBouncRateOnPage
                }
                
            })
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