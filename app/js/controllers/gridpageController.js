var app = angular.module('ngStompSockjsApp');


app.controller('gridpageController', ['$scope', '$interval', function($scope, $interval){


    

    $scope.connect = function () {
        
        $scope.gridOptions.api.refreshView();
        //$scope.gridOptions.api.setRowData($scope.gridOptions.rowData);
        
    };

    var rowData;
    var columnDefs;

    var initialize = function () {

        rowData = [
            {hour: 1,sales: 54},
            {hour: 2,sales: 66},
            {hour: 3,sales: 77},
            {hour: 4,sales: 70},
            {hour: 5,sales: 60},
            {hour: 6,sales: 63},
            {hour: 7,sales: 55},
            {hour: 8,sales: 47},
            {hour: 9,sales: 55},
            {hour: 10,sales: 30},
            {hour: 11,sales: 54},
            {hour: 12,sales: 66},
            {hour: 13,sales: 77},
            {hour: 14,sales: 70},
            {hour: 15,sales: 60},
            {hour: 16,sales: 63},
            {hour: 17,sales: 55},
            {hour: 18,sales: 47},
            {hour: 19,sales: 55},
            {hour: 20,sales: 30}
        ];

        columnDefs = [
            {headerName: "hour", field: "hour"},
            {headerName: "sales", field: "sales"}
        ];

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData,
            onGridReady: function(event) {

                event.api.sizeColumnsToFit();

            }

        };

        console.log($scope.gridOptions.rowData);

        $interval(function(){
            var hour=$scope.gridOptions.rowData.length+1;
            var sales= Math.round(Math.random() * 100);
            $scope.gridOptions.rowData.push({hour: hour, sales:sales});
            $scope.gridOptions.api.setRowData($scope.gridOptions.rowData);
        }, 2000, 100);
    };

    initialize();



}]);

