(function() {
  angular.module("media-app")
  .directive('popinMedia', function() {
    return {
      restrict: 'E',
      templateUrl: './app/popin/popin.part.html',
      scope: {
        'media': '=',
        'show': '=',
        'callbackNext': '&',
        'callbackPrevious': '&'
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function(mediaService, $scope) {
        var vm = this;
        vm.newTag = '';

        vm.keyPressed = function (keyEvent) {
          console.log('event', keyEvent);
          if (keyEvent.keyCode == 27) {
            vm.show=false;
          } else if (keyEvent.keyCode == 37) {
            vm.callbackPrevious();
          } else if (keyEvent.keyCode == 39) {
            vm.callbackNext();
          }
        
      };

        vm.addTag = function() {
          console.log(vm);
          if (vm.newTag.length !== 0 && vm.media.tags.indexOf(vm.newTag) === -1) {
            vm.media.tags.push(vm.newTag);
            vm.newTag = '';
            vm.save();
          }
        }

        vm.removeTag = function(tag) {
          vm.media.tags.splice(vm.media.tags.indexOf(tag), 1);
          vm.save();
        }

        vm.save = function() {
          mediaService.updateMedia(vm.media.id, vm.media).then((response) => {
          }, (err) => {
          });
        }

        vm.delete = function() {
          mediaService.deleteMedia(vm.media.id).then((response) => {
          }, (err) => {
          });
        }

        vm.handleKeyModal = function(event) {
        }
      }
    }
  });
})();
