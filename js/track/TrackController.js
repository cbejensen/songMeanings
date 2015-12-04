angular.module('TrackSuite')
.controller('TrackController', function($scope, $stateParams, trackService, mainService, $firebaseObject, $firebaseArray, Spotify) {
  
  $scope.getTrack = function(id) {
    trackService.getTrack(id).then(function(data) {
      $scope.spotifyTrack = data;
      $scope.trackRef = trackService.setTrackRef(data.name); //ref.child("tracks/" + data.name);
      $scope.trackData = $firebaseObject($scope.trackRef);
      $scope.comments = $firebaseArray($scope.trackRef.child("comments/"))
      $scope.loaded = true;
    });
  }
  $scope.getTrack($stateParams.id);
  
  $scope.showAddCommentForm = false;
  
  $scope.showTimestamp = function(timestamp) {
    return moment(timestamp).fromNow()
  }
  
  var verifyAuth = function(func) {
    var authData = mainService.verifyAuth();
    if (authData) {
      func(authData);
    } else {
      alert('Please log in first')
    }
  }
  
  $scope.rateTrack = function(rating) {
    var uid;
    verifyAuth(function(authData) {
      uid = authData.uid;
    })
    var path = $scope.trackRef.child('/ratings/' + uid);
    console.log(path);
    path.set({
      [uid]: rating
    })
  }
  
  $scope.addComment = function() {
    $scope.showAddCommentForm = !$scope.showAddCommentForm;
    $scope.focusInput = !$scope.focusInput;
  }
  
  $scope.submitComment = function() {
    verifyAuth(function(authData) {
      var commentsRef = $scope.trackRef.child('/comments/');
      commentsRef.push({
        name: authData.facebook.displayName,
        comment: $scope.newComment,
        timestamp: Date.now()
      })
      //cleanup
      $scope.showAddCommentForm = false;
      $scope.newComment.msg = '';
    })
  }
  
  // alerts user if no preview of track is available
  $scope.previewTrack = function(track) {
    if(!$scope.track.preview_url) {
      alert('Sorry - there\'s no preview available for this track!')
    }
  }
  
})