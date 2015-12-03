angular.module('TrackSuite')
.controller('TrackController', function($scope, $stateParams, trackService, mainService, $firebaseObject, $firebaseArray, Spotify) {
  
  var ref = new Firebase("https://song-meanings.firebaseio.com/");
  
  $scope.getTrack = function(id) {
    trackService.getTrack(id).then(function(data) {
      $scope.spotifyTrack = data;
      $scope.trackRef = ref.child("tracks/" + data.name);
      $scope.trackData = $firebaseObject($scope.trackRef);
      $scope.comments = $firebaseArray($scope.trackRef.child("comments/"))
      $scope.loaded = true;
    });
  }
  $scope.getTrack($stateParams.id);
  
  $scope.showAddCommentForm = false;
  
  var verifyAuth = function(func) {
    var authData = mainService.verifyAuth(ref);
    if (authData) {
      func(authData);
    } else {
      alert('Please log in first')
    }
  }
  
  $scope.showTimestamp = function(timestamp) {
    return moment(timestamp).fromNow()
  }
  
  $scope.verifyAuth = function() {
    return mainService.verifyAuth(ref);
  }
  
  $scope.addComment = function() {
    verifyAuth(function() {
      $scope.showAddCommentForm = !$scope.showAddCommentForm;
    });
  }
  
  $scope.submitComment = function() {
    verifyAuth(function(authData) {
      var commentsRef = new Firebase($scope.trackRef + "/comments/");
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
      alert('Sorry - there\'s no preview available for this song!')
    }
  }
  
})