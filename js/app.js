'use strict';

angular.module('TrackSuite', ['ui.router', 'firebase', 'spotify'])
.config(function ($stateProvider, $urlRouterProvider) {
  
  // $urlRouterProvider.otherwise('/#/');
  
  $stateProvider
    .state('sampleMain', {
      url: '/sample-tracks',
      templateUrl: 'js/sample/sampleMain.html',
      controller: 'MainController',
      resolve: {
        test: function tellMe(mainService) {
          mainService.getToken();
        }
      }
    })
    .state('main', {
      url: '/',
      templateUrl: 'js/main/main.html',
      controller: 'MainController'
    })
    .state('tracks', {
      url: '/tracks/:id',
      templateUrl: 'js/track/track.html',
      controller: 'TrackController',
    })
});