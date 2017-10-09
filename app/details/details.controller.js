(function () {
  angular.module("media-app").controller("detailsController", 
    function detailsController($scope, mediaService, $location) {
        var vm = this;
        vm.newTag = '';
        console.log('details')
        vm.media = mediaService.getMediaById(1);
        if (!vm.media) {
            $location.path('home');
        }
        console.log(mediaService.selectedMedia);
        console.log(vm.media);


        vm.removeTag = function(tag) {
            vm.media.tags.splice(vm.media.tags.indexOf(tag), 1);
        }

        vm.addTag = function() {
            if (vm.newTag.length !== 0 && vm.media.tags.indexOf(vm.newTag) === -1) {
                vm.media.tags.push(vm.newTag);
                vm.newTag = '';
            }
        }

        vm.save = function() {
            console.log(mediaService.getAllMedia()[mediaService.getAllMedia().indexOf(vm.media)]);
        }
    });
})();