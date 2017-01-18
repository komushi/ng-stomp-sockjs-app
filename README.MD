# Stomp SockJS demos by Angular


----------
Quick Start
-------------

## Download

```
$ git clone https://github.com/komushi/ng-stomp-sockjs-app
```

## Start RabbitMQ Server

```
$ rabbitmq-server
```

or

```
$ brew services start rabbitmq-server
```

## enable web-stomp plugin

```
$ rabbitmq-plugins enable rabbitmq_web_stomp
```

## Build & Start Send-Data

```
cd ng-stomp-sockjs-app/ws-client
npm install
node send-data-over-ws-rabbitmq.js
```

## Build & Start GUI

```
cd ng-stomp-sockjs-app/app
bower install
npm install -g live-server
live-server
```



