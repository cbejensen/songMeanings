angular.module('TrackSuite')
.directive('focus', function($timeout) {
  return {
    link: function(scope, elem, attrs) {
      scope.$watch(attrs.focus, function(value) {
        console.log('focus directive value:', value)
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