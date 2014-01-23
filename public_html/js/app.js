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
            getDefaultPageData: dashCtrl.getDefaultPageData,
            getLogin: dashCtrl.getLogin,
            getTopBrowser: dashCtrl.getTopBrowser
        }

    })
            .when('/tables',
            {
                controller: 'TabelsCtrl',
                templateUrl: 'partials/tables.html',
                resolve: {
                    getBrowsers: TabelsCtrl.getBrowsers,
                    getDevice: TabelsCtrl.getDevice,
                    getOS: TabelsCtrl.getOS,
                    getJava: TabelsCtrl.getJava
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
                controller: 'formsCtrl',
                templateUrl: 'partials/forms.html',
                resolve: {
                    getBouncRateOnPage: formsCtrl.getBouncRateOnPage

                }
            })
            .otherwise({redirectTo: '/'});
});
