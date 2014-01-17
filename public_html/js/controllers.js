statboard.controller('MainCtrl', function($scope, $window, googleLogin) {

    $window.init = function() {
        $scope.$apply($scope.handleClientLoad());
    };

    $scope.handleClientLoad = function() {
        console.log("login");
        googleLogin.login();
    };
});

var dashCtrl = statboard.controller('DashboardCtrl', function($scope, getNewHits, getBounce, getReturning, getPageNav) {
    console.log("tabelsCtrl");
    $scope.message = 'This is Add new order screen';
    var data = {};
    data.newHits = getNewHits.rows[0][0];
    data.bounce = getBounce.rows[0][0];
    data.returning = getReturning.rows[0][0];
    data.pageNavigations = getPageNav.rows[0][0];
    $scope.data = data;

});
statboard.controller('TabelsCtrl', function($scope) {
    console.log("tabelsCtrl");
});

var appCtrl = statboard.controller('ChartsCtrl', function($scope, $filter, loadData) {
    var chart = [];

    init();
    function init() {
//        $scope.chart = factory.getChart();
    }
    function fillChart() {
        for (i = 1; i < loadData.rows.length; i++) {
            chart[i] = Object({name: $filter('json')(loadData[i][1])});
//        $scope.chart[i] = Object({name:loadData[i][1], visiotrs: loadData[i][1]});
        }
    }
    ;

    console.log(chart);
//    
//    for (i = 0; i < loadData.rows.length; i++) {       
//        chart[i] = Object({title:loadData[i][0],visitor: loadData[i][1]})
//           }

    console.log("Lengden av tabellen: " + loadData.rows.length);

    $scope.message = loadData.rows[1];
});


statboard.factory('factory', function() {
    var chart = [];

    var factory = {};
    factory.getChart = function() {
        console.log(loadData.rows[1]);
        var t1 = new Array('Tore', 'Knutsen', 'Ludvigsen');
        for (i = 0; i < t1.length; i++) {
            chart[i] = Object({name: t1[i]});
        }
        return chart;
    };

    factory.postCustomers = function() {

    };
    return factory;
});

dashCtrl.getBounce = function($q) {
    console.log("Get new hits");

    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': '2014-01-17',
        'end-date': '2014-01-17',
        'metrics': 'ga:bounces',
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};

dashCtrl.getReturning = function($q) {
    console.log("Get new hits");

    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': '2014-01-17',
        'end-date': '2014-01-17',
        'metrics': 'ga:newVisits',
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};

dashCtrl.getPageNav = function($q) {
    console.log("Get new hits");

    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': '2014-01-17',
        'end-date': '2014-01-17',
        'metrics': 'ga:pageviews',
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};

dashCtrl.getNewHits = function($q) {
    console.log("Get new hits");

    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': '2014-01-17',
        'end-date': '2014-01-17',
        'metrics': 'ga:newVisits',
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};

appCtrl.loadData = function($q) {

    console.log("gapi");
    var deferer = $q.defer();

    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': '2014-01-17',
        'end-date': '2014-01-17',
        'dimensions': 'ga:pageTitle',
        'sort': '-ga:visitors',
        'metrics': 'ga:visitors',
        'max-results': '50'
    }).execute(function(results) {
        deferer.resolve(results);
    });

    return deferer.promise;
}