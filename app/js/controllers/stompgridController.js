var app = angular.module('ngStompSockjsApp');


app.controller('stompgridController', ['$scope', '$stomp', function($scope, $stomp){

    $scope.connect = function () {
        var connectHeaders = {};
        connectHeaders.login = $scope.model.usr;
        connectHeaders.passcode = $scope.model.pwd;

        $stomp.connect($scope.model.url, connectHeaders)
            .then(function (frame) {
                console.log('Connected: ' + frame);
            })
            .catch(function(reason) {
                console.error('Connection error:', reason);
            });
    };

    // Disconnect
    $scope.disconnect = function () {
        $stomp.connect().then(
            function () {
                console.log('Disconnected');
            });        
    };
    
    // Subscribe a queue
    $scope.subscribe = function () {
        
        // var headers = {ack: 'client', 'selector': "type = 'Type0' AND sales > 49"};
        var headers = {};

        $stomp.subscribe($scope.model.queue, headers).then(null,null,updateGrid);
    };

    // Unsubscribe a queue
    $scope.unsubscribe = function () {
        $stomp.unsubscribe($scope.model.queue);
    };

    // Send a message
    $scope.send = function () {
        $stomp.send($scope.model.dest, JSON.parse($scope.model.payload), JSON.parse($scope.model.headers));
    };

    // notify callback function
    var updateGrid = function (res) {
        console.log('res');
        console.log(res.headers);
        console.log(res.body);
        $scope.model.rowCollection.push(JSON.parse(res.body));
    };

    var initialize = function () {
        $scope.model = {}

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

