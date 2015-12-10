angular.module('TrackSuite', ['ui.router', 'firebase', 'spotify'])
.config(function (SpotifyProvider, $stateProvider, $urlRouterProvider) {
  SpotifyProvider.setClientId('456095fae6884551b223950e2a72f04a');
  SpotifyProvider.setRedirectUri('http://localhost:8080/auth');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  SpotifyProvider.setAuthToken(window.localStorage['spotify-token']);
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'js/login/login.html'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'js/home/home.html',
      controller: 'MainController'
    })
    .state('main', {
      url: '/',
      templateUrl: 'js/main/main.html'
    })
    .state('tracks', {
      url: '/tracks/:id',
      templateUrl: 'js/track/track.html',
      controller: 'TrackController',
    })
});