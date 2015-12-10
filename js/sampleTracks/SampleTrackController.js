angular.module('TrackSuite')
.controller('SampleTrackController', function($http, $scope, $stateParams, sampleTrackService, mainService, $firebaseObject, $firebaseArray, Spotify) {
  
  $scope.getTrack = function(id) {
    sampleTrackService.getTrack(id).then(function(data) {
      $scope.spotifyTrack = data;
      $scope.trackRef = sampleTrackService.tracksRef.child(data.id);
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
    sampleTrackService.rateTrack($scope.trackRef, rating)
  }
  
  $scope.addComment = function() {
    var auth = mainService.verifyAuth();
    if(auth) {
      $scope.showAddCommentForm = !$scope.showAddCommentForm;
      $scope.focusInput = !$scope.focusInput;
    } else {
      alert('Please log in before adding a comment')
    }
  }
  
  $scope.submitComment = function() {
    var auth = mainService.verifyAuth();
    if (auth) {
      var obj = {
        name: auth.facebook.displayName,
        comment: $scope.newComment,
        timestamp: Date.now()
      }
      sampleTrackService.submitComment($scope.trackRef, obj);
    } else {
      alert('Please log in before adding a comment')
    }
    //clean up
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