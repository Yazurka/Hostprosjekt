
statboard.controller('MainCtrl', function($scope, $window, googleLogin) {
	
    $window.init = function() {
        $scope.$apply($scope.handleClientLoad());
    };
	
    $scope.handleClientLoad = function() {
        console.log("login");
        googleLogin.login();
    };
});

statboard.controller('DashboardCtrl', function($scope) {
    console.log("tabelsCtrl");
    $scope.message = 'This is Add new order screen';
    var data = {};
    data.newHits = 22;
    data.flight = 32;
    data.returning = 44;
    data.pageNavigations = 2;
    $scope.data = data;
     
});

statboard.controller('TabelsCtrl', function($scope) {
    console.log("tabelsCtrl");
});

var appCtrl = statboard.controller('ChartsCtrl', function($scope, loadData) {
    console.log("ChartsCtrl");

    $scope.message = loadData.rows[0][0];
});

appCtrl.loadData = function($q) {
    
    console.log("gapi");
    
    var deferer = $q.defer();
    
    gapi.client.analytics.data.ga.get({
    'ids': 'ga:69056558',
    'start-date': '2013-12-24',
    'end-date': '2014-01-07',
    'metrics': 'ga:visits'
    }).execute(function (results) {
        deferer.resolve(results);
    });
  
    return deferer.promise;
}