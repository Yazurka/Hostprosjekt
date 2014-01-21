function init() {
    console.log("init");
    window.init();
}

var statboard = angular.module('statboard', ['ngRoute']);

statboard.config(function($routeProvider) {
    $routeProvider
            .when('/', {
        controller: 'DashboardCtrl',
        templateUrl: 'partials/dashboard.html',
        resolve: {
            getDefaultPageData: dashCtrl.getDefaultPageData
        }

    })
            .when('/tables',
            {
                controller: 'TabelsCtrl',
                templateUrl: 'partials/tables.html',
                resolve: {
                    getBrowsers: TabelsCtrl.getBrowsers
                }
            })
            .when('/charts',
            {
                controller: 'ChartsCtrl',
                templateUrl: 'partials/charts.html',
                resolve: {
                    mostUsed: appCtrl.mostUsed,
                    leastUsed: appCtrl.leastUsed
                }
            })
            .when('/forms',
            {
                controller: 'formsCtr,',
                templateUrl: 'partials/forms.html',
                resolve: {
                    getBouncRateOnPage: dashCtrl.getBouncRateOnPage

                }
            })
            .otherwise({redirectTo: '/'});
});
