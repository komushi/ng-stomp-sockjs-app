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
        
        var headers = {};

        $stomp.subscribe($scope.model.subdest, headers).then(null,null,updateGrid);
    };

    // Unsubscribe a queue
    $scope.unsubscribe = function () {
        $stomp.unsubscribe($scope.model.subdest);
    };

    // Send a message
    $scope.send = function () {
        $stomp.send($scope.model.pubdest, JSON.parse($scope.model.payload), JSON.parse($scope.model.headers));
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

        // $scope.model.url = 'http://localhost:15674/stomp';
        $scope.model.url = 'ws://localhost:61623/';
        // $scope.model.usr = 'guest';
        $scope.model.usr = 'admin';
        // $scope.model.pwd = 'guest';
        $scope.model.pwd = 'password';
        $scope.model.subdest = '/topic/dest';
        $scope.model.pubdest = '/topic/dest';
        $scope.model.payload = '{"name":"Tom", "type":"Type0", "sales":50}';
        $scope.model.headers = '{}';

        $scope.model.rowCollection = [];


    };

    initialize();

}]);

