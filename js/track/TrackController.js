angular.module('TrackSuite')
.controller('TrackController', function($http, $scope, $stateParams, trackService, mainService, $firebaseObject, $firebaseArray, Spotify) {
  
  $scope.getTrack = function(id) {
    trackService.getTrack(id).then(function(data) {
      $scope.spotifyTrack = data;
      $scope.trackRef = trackService.tracksRef.child(data.id);
      $scope.trackData = $firebaseObject($scope.trackRef);
      $scope.comments = $firebaseArray($scope.trackRef.child("/comments/"))
      $scope.loaded = true;
    });
  }
  $scope.getTrack($stateParams.id);
  $scope.rating = 3;
  $scope.showAddCommentForm = false;
  
  $scope.showTimestamp = function(timestamp) {
    return moment(timestamp).fromNow()
  }
  
  $scope.rateTrack = function(rating) {
    trackService.rateTrack($scope.trackRef, rating)
  }
  
  $scope.addComment = function() {
    Spotify.getCurrentUser().then(function (data) {
      console.log(data);
      $scope.showAddCommentForm = !$scope.showAddCommentForm;
      $scope.focusInput = !$scope.focusInput;
    }, function (error) {
      alert('Please log in before adding a comment');
    });
  }
  
  $scope.submitComment = function() {
    Spotify.getCurrentUser().then(function (data) {
      var obj = {
        name: data.display_name,
        comment: $scope.newComment,
        timestamp: Date.now()
      }
      trackService.submitComment($scope.trackRef, obj);
    }, function (error) {
      alert('Please log in before adding a comment');
    });
    $scope.showAddCommentForm = false;
    $scope.newComment.msg = '';
  }
  
  // alerts user if no preview of track is available
  $scope.previewTrack = function(track) {
    if(!$scope.track.preview_url) {
      alert('Sorry - there\'s no preview available for this track!')
    }
  }
  
})