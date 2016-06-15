var colorPalette = function (level) {

    var color;

    switch (level) {
        case 0:
            color = "#b71c1c";
            break;
        case 1:
            color = "#c62828";
            break;
        case 2:
            color = "#d32f2f";
            break;
        case 3:
            color = "#e53935";
            break;
        case 4:
            color = "#f44336";
            break;
        case 5:
            color = "#ef5350";
            break;
        case 6:
            color = "#e57373";
            break;
        case 7:
            color = "#ef9a9a";
            break;
        case 8:
            color = "#ffcdd2";
            break;
        case 9:
            color = "#ffebee";
            break;
    }
    return {'background-color': color}
};

var getLevel = function (currentPosition, totalLength) {

    return Math.ceil(currentPosition/totalLength*10);
};

var app = angular.module('ngStompSockjsApp');


app.controller('gridpageController', ['$scope', '$interval', function($scope, $interval){


    

    $scope.connect = function () {
        
        $scope.gridOptions.api.refreshView();
        //$scope.gridOptions.api.setRowData($scope.gridOptions.rowData);
        
    };

    var initialize = function () {

        var rowData = [];

        // rowData = [
        //     {hour: 1,sales: 54},
        //     {hour: 2,sales: 66},
        //     {hour: 3,sales: 77},
        //     {hour: 4,sales: 70},
        //     {hour: 5,sales: 60},
        //     {hour: 6,sales: 63},
        //     {hour: 7,sales: 55},
        //     {hour: 8,sales: 47},
        //     {hour: 9,sales: 55},
        //     {hour: 10,sales: 30},
        //     {hour: 11,sales: 54},
        //     {hour: 12,sales: 66},
        //     {hour: 13,sales: 77},
        //     {hour: 14,sales: 70},
        //     {hour: 15,sales: 60},
        //     {hour: 16,sales: 63},
        //     {hour: 17,sales: 55},
        //     {hour: 18,sales: 47},
        //     {hour: 19,sales: 55},
        //     {hour: 20,sales: 30}
        // ];

        var columnDefs = [
            {headerName: "hour", field: "hour"},
            {headerName: "sales", field: "sales"}
        ];

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowData: rowData,
            onGridReady: function(event) {

                event.api.sizeColumnsToFit();

            },
            getRowStyle: function(params) {
                console.log(params.data);
                var level = getLevel(params.data.hour, rowData.length)
                return colorPalette(level);
            }

        };


        // console.log($scope.gridOptions.rowData);

        $interval(function(){
            var hour=$scope.gridOptions.rowData.length+1;
            var sales= Math.round(Math.random() * 100);
            $scope.gridOptions.rowData.push({hour: hour, sales:sales});
            $scope.gridOptions.api.setRowData($scope.gridOptions.rowData);
        }, 1000, 1000);
    };

    initialize();



}]);

