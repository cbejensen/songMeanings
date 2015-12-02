angular.module('TrackSuite')
.controller('TrackController', function($scope, $stateParams, trackService, $firebaseObject, $firebaseArray, Spotify) {
  
  var ref = new Firebase("https://song-meanings.firebaseio.com/");
  
  $scope.getTrack = function(id) {
    trackService.getTrack(id).then(function(data) {
      $scope.spotifyTrack = data;
      $scope.trackRef = ref.child("tracks/" + data.name);
      $scope.trackData = $firebaseObject($scope.trackRef);
      $scope.comments = $firebaseArray($scope.trackRef.child("comments/"))
      console.log($scope.comments)
      $scope.loaded = true;
    });
  }
  $scope.getTrack($stateParams.id);
  
  $scope.showAddCommentForm = false;
  
  $scope.addComment = function() {
    trackService.authorize(ref);
    $scope.newComment.name = "Fred"; // TODO: delete this when user accounts are set up
    $scope.newComment.timestamp = new Date().toString();
    var commentsRef = new Firebase($scope.trackRef + "/comments/");
    $scope.comments = $firebaseArray(commentsRef);
    $scope.comments.$add($scope.newComment).then(function(ref) {
      console.log('added comment with ID:', ref.key());
    })
    //cleanup
    $scope.showAddCommentForm = false;
    $scope.newComment.msg = '';
  }
  
  // alerts user if no preview of track is available
  $scope.previewTrack = function(track) {
    if(!$scope.track.preview_url) {
      alert('Sorry - there\'s no preview available for this song!')
    }
  }
  
})