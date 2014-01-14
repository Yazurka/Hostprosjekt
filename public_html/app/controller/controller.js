

dashboardApp.controller('dashController', function($scope, factory) {
    $scope.number = [];//[{number:19}, {number:12},{number:124},{number:32}];
    var data = {};
    data.newHits = 22;
    data.flight = 32;
    data.returning = 44;
    data.pageNavigations = 2;
    $scope.data = data;
    init();

    function init() {
        $scope.number = factory.getNumber();

    }
    $scope.addNumber = function() {

        $scope.number.push({number: $scope.div.number});
    }
});

dashboardApp.controller('randomController', function($scope, factory) {
    init();

    function init() {
        $scope.number = factory.getNumber();

    }
    $scope.addNumber = function() {

        $scope.number.push({number: $scope.div.number});
    }
});

dashboardApp.factory('factory', function() {
//[{number:19}, {number:12},{number:124},{number:32}];
    var number = getStuffs();

    var factory = {};

    factory.getNumber = function() {
        return number;
    };
    factory.addNumber = function(number) {
        number.push(number);
    }
    return factory;
});
