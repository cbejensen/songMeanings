angular.module('TrackSuite')
.controller('TrackController', function($scope, $stateParams, trackService, mainService, $firebaseObject, $firebaseArray, Spotify) {
  
  $scope.getTrack = function(id) {
    trackService.getTrack(id).then(function(data) {
      $scope.spotifyTrack = data;
      $scope.trackRef = trackService.tracksRef.child(data.name);
      $scope.trackData = $firebaseObject($scope.trackRef);
      $scope.comments = $firebaseArray($scope.trackRef.child("/comments/"))
      $scope.loaded = true;
    });
  }
  $scope.getTrack($stateParams.id);
  
  $scope.showAddCommentForm = false;
  
  $scope.showTimestamp = function(timestamp) {
    return moment(timestamp).fromNow()
  }
  
  $scope.rateTrack = function(rating) {
    trackService.rateTrack($scope.trackRef, rating)
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
      trackService.submitComment($scope.trackRef, obj);
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