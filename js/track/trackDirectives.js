angular.module('TrackSuite')
.directive('focus', function($timeout) {
  return {
    link: function(scope, elem, attrs) {
      scope.$watch(attrs.focus, function(value) {
        if(value === true) { 
          $timeout(function() {
            elem[0].focus();
            scope[attrs.focus] = false;
          });
        }
      });
    }
  }
})

.directive('starRating', function() {
  return {
    restrict: 'EA',
    templateUrl: 'js/track/starRating.html',
    scope: {
     ratingValue: '=',
     max: '=',
     onRatingSelected: '&'
    },
    link: function(scope, elem, attrs) {
      var updateStars = function() {
        scope.stars = [];
        for ( var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : i < scope.ratingValue
          });
        }
      };

      scope.toggle = function(index) {
        scope.ratingValue = index + 1;
        scope.onRatingSelected({
          rating : index + 1
        });
        alert('Your ' + scope.ratingValue + ' star rating has been received!')
      };

      scope.$watch('ratingValue',
        function(oldVal, newVal) {
          if (newVal) {
            updateStars();
          }
        }
      );
    }
  };
});