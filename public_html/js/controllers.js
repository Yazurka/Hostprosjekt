var date = null;

function setDate() {
    var d, day, month, year;
    d = new Date();
    day = d.getDate();
    month = d.getMonth() + 1;
    year = d.getFullYear();
    if (day < 10)
        day = '0' + day;
    if (month < 10)
        month = '0' + month;
    date = year + '-' + month + '-' + day;
}

function roundNumber(num, dec){
    return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
}

statboard.controller('MainCtrl', function($scope, $window, googleLogin) {

    $scope.setActive = function(type) {
        $scope.startActive = '';
        $scope.chartsActive = '';
        $scope.tablesActive = '';
        $scope.formsActive = '';

        $scope[type + 'Active'] = 'active';
    };

    $window.init = function() {
        $scope.$apply($scope.handleClientLoad());
    };

    $scope.handleClientLoad = function() {
        console.log("login");
        googleLogin.login();
    };
});


var dashCtrl = statboard.controller('DashboardCtrl', function($scope, getDefaultPageData, getLogin, getTopBrowser) {
    var data = {};
    data.pageNavigations = parseInt(getDefaultPageData.rows[0][3]) + parseInt(getDefaultPageData.rows[1][3]);
    data.returning = getDefaultPageData.rows[1][4];
    data.bounce = roundNumber(parseFloat(getDefaultPageData.rows[1][2]) + parseFloat(getDefaultPageData.rows[0][2]),2);
    data.newHits = getDefaultPageData.rows[0][4];
    $scope.getLogin = getLogin.rows;
    $scope.getTopBrowser = getTopBrowser.rows;
    $scope.data = data;

});
var TabelsCtrl = statboard.controller('TabelsCtrl', function($scope, getBrowsers, getDevice,getOS, getJava) {
    $scope.getBrowsers = getBrowsers.rows;
    $scope.getDevice = getDevice.rows;
    $scope.getOS = getOS.rows;
    $scope.getJava = getJava.rows;
    console.log("tabelsCtrl");
});


var appCtrl = statboard.controller('ChartsCtrl', function($scope, mostUsed, leastUsed) {
    $scope.res = mostUsed.rows;
    $scope.lRes = leastUsed.rows;
});

var formsCtrl = statboard.controller('formsCtrl', function($scope, getBouncRateOnPage) {
    $scope.bounces = getBouncRateOnPage.rows;
});

dashCtrl.getTopBrowser = function($q) {
    if (!date)
        setDate();
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions': 'ga:browser',
        'metrics': 'ga:visitors',
        'max-results': '1',
        'sort': '-ga:visitors'
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};

TabelsCtrl.getDevice = function ($q){
    if (!date)
        setDate();
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions': 'ga:deviceCategory',
        'metrics': 'ga:visitors',
        'sort': '-ga:visitors'
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};
TabelsCtrl.getJava = function ($q){
    if (!date)
        setDate();
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions': 'ga:javaEnabled',
        'metrics': 'ga:visitors',
        'sort': '-ga:visitors'
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};

TabelsCtrl.getBrowsers = function($q) {
    if (!date)
        setDate();
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions': 'ga:browser,ga:browserVersion',
        'metrics': 'ga:visitors',
        'sort': '-ga:visitors',
        'max-results': '50'
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};
TabelsCtrl.getOS = function($q) {
    if (!date)
        setDate();
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions': 'ga:operatingSystem,ga:operatingSystemVersion',
        'metrics': 'ga:visitors',
        'sort': '-ga:visitors',
        'max-results': '50'
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

dashCtrl.getLogin = function($q) {
    if (!date)
        setDate();
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions': 'ga:pageTitle',
        'metrics': 'ga:visitors',
        'filters': 'ga:pageTitle==Nettbedrift - Pålogging med BankID'
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};

dashCtrl.getDefaultPageData = function($q) {
    if (!date)
        setDate();
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions': 'ga:visitorType',
        'metrics': 'ga:newVisits,ga:visitBounceRate,ga:pageviews,ga:visitors'
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};

appCtrl.mostUsed = function($q) {
    if (!date)
        setDate();
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
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
if (!date) setDate();
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions': 'ga:pageTitle',
        'sort': 'ga:visitors',
        'metrics': 'ga:visitors',
        'max-results': '75'
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};

formsCtrl.getBouncRateOnPage = function($q) {
    if (!date)
        setDate();
    var deferer = $q.defer();
    gapi.client.analytics.data.ga.get({
        'ids': 'ga:69056558',
        'start-date': date,
        'end-date': date,
        'dimensions': 'ga:exitPagePath',
        'sort': '-ga:visitors',
        'metrics': 'ga:visitors',
        'max-results': '50'
    }).execute(function(results) {
        deferer.resolve(results);
    });
    return deferer.promise;
};