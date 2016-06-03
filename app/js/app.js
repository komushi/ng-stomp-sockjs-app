var app =  angular.module('ngStompSockjsApp', [
	'ngRoute',
	// 'ui.grid',
	'ngStomp'
]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	// $locationProvider.html5Mode(true);
	// $locationProvider.hashPrefix = '#';



	$routeProvider.
		when("/", {redirectTo: '/stompgrid'}).
		// when("/gridpage", {templateUrl: "views/gridpage.html", controller: "gridpageController"}).
		when("/stompgrid", {templateUrl: "views/stompgrid.html", controller: "stompgridController"});

}]);
