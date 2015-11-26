angular.module('TrackSuite')
.controller('TrackController', function($scope, $stateParams, trackService, $firebaseObject, $firebaseArray, Spotify) {
  
  var ref = new Firebase("https://song-meanings.firebaseio.com/");
  var trackRef; // undefined until getTrack() runs
  
  $scope.getTrack = function(id) {
    trackService.getTrack(id).then(function(data) {
      $scope.spotifyTrack = data;
      trackRef = ref.child("tracks/" + data.name);
      $scope.trackData = $firebaseObject(trackRef);
      $scope.loaded = true;
    });
  }
  $scope.getTrack($stateParams.id);
  
  // COMMENTS
  $scope.showAddCommentForm = false;
  
  $scope.addComment = function() {
    $scope.newComment.name = "Fred"; // TODO: delete this when ready
    $scope.newComment.timestamp = new Date().toString();
    var commentsRef = new Firebase(trackRef + "/comments/");
    $scope.comments = $firebaseArray(commentsRef);
    $scope.comments.$add($scope.newComment).then(function(ref) {
      console.log('added comment with ID:', ref.key());
    })
    $scope.showAddCommentForm = false;
    $scope.newComment.msg = '';
  }
  
  /* alerts user if no preview of track is available*/
  $scope.previewTrack = function(track) {
    if(!$scope.track.preview_url) {
      alert('Sorry - there\'s no preview available for this song!')
    }
  }
  
})