var app = angular.module('ngStompSockjsApp');


app.controller('stompgridController', ['$scope', '$interval', '$stomp', function($scope, $interval, $stomp){
    // $scope.gridData=[
    //     {hour: 1,sales: 54},
    //     {hour: 2,sales: 66},
    //     {hour: 3,sales: 77},
    //     {hour: 4,sales: 70},
    //     {hour: 5,sales: 60},
    //     {hour: 6,sales: 63},
    //     {hour: 7,sales: 55},
    //     {hour: 8,sales: 47},
    //     {hour: 9,sales: 55},
    //     {hour: 10,sales: 30}
    // ];

    // $interval(function(){
    //     var hour=$scope.gridData.length+1;
    //     var sales= Math.round(Math.random() * 100);
    //     $scope.gridData.push({hour: hour, sales:sales});
    // }, 1000, 100);

    $scope.connect = function () {
        
        // var connectHeaders = '{"' + $scope.model.usr + '" : "'
        var connectHeaders = {};
        connectHeaders.login = $scope.model.usr;
        connectHeaders.passcode = $scope.model.pwd;
        console.log(connectHeaders);
        console.log('connectHeaders:' + JSON.stringify(connectHeaders));
        console.log(JSON.parse(JSON.stringify(connectHeaders)));

        $stomp.connect($scope.model.url, connectHeaders).then(
            function (frame) {
                console.log('Connected: ' + frame);
            });
        
    };

    $scope.subscribe = function () {
        $stomp.subscribe($scope.model.queue).then(null,null,updateGrid);
    };


    $scope.send = function () {
        $stomp.send($scope.model.dest, JSON.parse($scope.model.payload), JSON.parse($scope.model.headers));
    };

    var updateGrid = function (res) {
        console.log('res');
        console.log(res);
        $scope.model.rowCollection.push(JSON.parse(res.body));
    };

    var initialize = function () {
        $scope.model = {}

        // $scope.model.url = localStorage.getItem('model.url') || 'http://localhost:8080/stomp';
        $scope.model.url = 'http://localhost:15674/stomp';
        $scope.model.usr = 'guest';
        $scope.model.pwd = 'guest';
        $scope.model.queue = '/topic/dest';
        $scope.model.dest = '/topic/dest';
        $scope.model.payload = '{"key":"value"}';
        $scope.model.headers = '{}';

        $scope.model.rowCollection = [];


    };

    initialize();

}]);

