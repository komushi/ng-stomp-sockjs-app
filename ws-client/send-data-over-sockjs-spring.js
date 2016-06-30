var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
var randomWords = require('random-words');
var stompClient;
var socket;
var endpoint = 'http://127.0.0.1:8080/stomp';

var stompSuccessCallback = function (frame) {
  console.log('STOMP: Connection successful: ' + frame);

  stompClient.subscribe('/topic/ticktock', function(greeting){
    console.log('/topic/ticktock subscribed');
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
    socket = new SockJS(endpoint);
    stompClient = Stomp.over(socket);
    
    stompClient.connect('guest', 'guest', stompSuccessCallback, stompFailureCallback);

};

var sendMessage = function (){
  var rows = [];
  var count = 550;

  for (i = 1; i <= 47; i++) {
    var row = {};
    row.rank = i;
    row.from = "C" + Math.ceil(Math.random() * 300) + "." + Math.ceil(Math.random() * 300);
    row.to = "C" + Math.ceil(Math.random() * 300) + "." + Math.ceil(Math.random() * 300);
    row.count = count - i;
    rows.push(row);
  }

  stompClient.send('/topic/ticktock', {}, JSON.stringify(rows));
};

stompConnect();

setInterval(sendMessage, 500);

