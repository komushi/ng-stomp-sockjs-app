var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
var randomWords = require('random-words');
var stompClient;
var socket;
var endpoint = 'ws://127.0.0.1:15674/ws';

var stompSuccessCallback = function (frame) {
  console.log('STOMP: Connection successful: ' + frame);

  stompClient.subscribe('/topic/dest', function(greeting){
    console.log('/topic/dest subscribed');
    console.log(greeting);
  });

};

var stompFailureCallback = function (error) {
    console.log('STOMP: ' + error);

    setTimeout(stompConnect, 4000);
    console.log('STOMP: Reconecting in 4 seconds');
};

var stompConnect = function () {
    console.log('STOMP: Attempting connection');
    // recreate the stompClient to use a new WebSocket
    stompClient = Stomp.overWS(endpoint);
    
    stompClient.connect('guest', 'guest', stompSuccessCallback, stompFailureCallback);

};

var sendMessage = function (){
  var row = {};
  row.name = randomWords();
  row.type = "Type" + Math.floor(Math.random() * 2);
  row.sales = Math.round(Math.random() * 100);

  stompClient.send('/topic/dest', {}, JSON.stringify(row));
};

stompConnect();

setInterval(sendMessage, 2000);

