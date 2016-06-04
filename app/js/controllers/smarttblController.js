var app = angular.module('ngStompSockjsApp');


app.controller('smarttblController', ['$scope', '$interval', function($scope, $interval){


    var initialize = function () {

        var rowCollection=[
            {hour: 1,sales: 54},
            {hour: 2,sales: 66},
            {hour: 3,sales: 77},
            {hour: 4,sales: 70},
            {hour: 5,sales: 60},
            {hour: 6,sales: 63},
            {hour: 7,sales: 55},
            {hour: 8,sales: 47},
            {hour: 9,sales: 55},
            {hour: 10,sales: 30}
        ];

        $scope.rowCollection = rowCollection;

        console.log(rowCollection);

        $interval(function(){
            var hour=rowCollection.length+1;
            var sales= Math.round(Math.random() * 100);
            rowCollection.push({hour: hour, sales:sales});
        }, 2000, 100);
    };

    initialize();



}]);

