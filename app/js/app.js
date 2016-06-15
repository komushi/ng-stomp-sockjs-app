agGrid.initialiseAgGridWithAngular1(angular);

var app =  angular.module('ngStompSockjsApp', [
	'ngRoute',
	'agGrid',
	'smart-table',
	'ngStomp'
]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	// $locationProvider.html5Mode(true);
	// $locationProvider.hashPrefix = '#';



	$routeProvider.
		when("/", {redirectTo: '/stompgrid'}).
		when("/gridpage", {templateUrl: "views/gridpage.html", controller: "gridpageController"}).
		when("/smarttbl", {templateUrl: "views/smarttbl.html", controller: "smarttblController"}).
		when("/stompgrid", {templateUrl: "views/stompgrid.html", controller: "stompgridController"}).
		when("/stomptbl", {templateUrl: "views/stomptbl.html", controller: "stomptblController"});

}]);
