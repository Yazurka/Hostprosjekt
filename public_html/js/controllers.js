var d = new Date();
var day = d.getDate();
var month = d.getMonth()+1;
var year = d.getFullYear();
if(day < 10) day = '0'+day;
if(month<10) month='0'+month;
var date = year+'-'+month+'-'+day;

statboard.controller('MainCtrl', function($scope, $window, googleLogin) {

    $window.init = function() {
        $scope.$apply($scope.handleClientLoad());
    };

    $scope.handleClientLoad = function() {
        console.log("login");
        googleLogin.login();
    };
});

var dashCtrl = statboard.controller('DashboardCtrl', function($scope, getDefaultPageData,getBouncRateOnPage) {
    var data = {};
    data.pageNavigations = parseInt(getDefaultPageData.rows[0][3]) + parseInt(getDefaultPageData.rows[1][3]);
    data.returning = getDefaultPageData.rows[1][4];
    data.bounce = parseInt(getDefaultPageData.rows[1][2]) + parseInt(getDefaultPageData.rows[0][2]);
    data.newHits = getDefaultPageData.rows[0][4];
    
    $scope.data = data;
    $scope.bounces = getBouncRateOnPage.rows;

});
var TabelsCtrl = statboard.controller('TabelsCtrl', function($scope,getBrowsers) {
    $scope.getBrowsers=getBrowsers.rows;
    console.log("tabelsCtrl");
});


var appCtrl = statboard.controller('ChartsCtrl', function($scope, mostUsed, leastUsed) {
    $scope.res = mostUsed.rows;
    $scope.lRes = leastUsed.rows;
});

TabelsCtrl.getBrowsers = function ($q){
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions':'ga:browser',
        'metrics': 'ga:visitors'
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};
statboard.factory('factory', function() {
    var chart = [];

    var factory = {};
    factory.getChart = function() {
        console.log(mostUsed.rows[1]);
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

dashCtrl.getDefaultPageData = function($q) {

    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions':'ga:visitorType',
        'metrics': 'ga:newVisits,ga:bounces,ga:pageviews,ga:visitors'
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};

appCtrl.mostUsed = function($q) {

    var deferer = $q.defer();

    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': '2014-01-17',
        'end-date': '2014-01-17',
        'dimensions': 'ga:pageTitle',
        'sort': '-ga:visitors',
        'metrics': 'ga:visitors',
        'max-results': '75'
    }).execute(function(results) {
        deferer.resolve(results);
    });

    return deferer.promise;
};
appCtrl.leastUsed = function($q) {

    var deferer = $q.defer();

    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': '2014-01-17',
        'end-date': '2014-01-17',
        'dimensions': 'ga:pageTitle',
        'sort': 'ga:visitors',
        'metrics': 'ga:visitors',
        'max-results': '75'
    }).execute(function(results) {
        deferer.resolve(results);
    });

    return deferer.promise;
};

dashCtrl.getBouncRateOnPage = function($q) {
    var deferer = $q.defer();

    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': '2014-01-17',
        'end-date': '2014-01-17',
        'dimensions': 'ga:pageTitle',
        'sort': '-ga:visitBounceRate',
        'metrics': 'ga:visitBounceRate',
        'max-results': '20'
    }).execute(function(results) {
        deferer.resolve(results);
    });

    return deferer.promise;
};