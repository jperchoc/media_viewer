(function () {
  angular.module("media-app").controller("detailsController", 
    function detailsController($scope, mediaService, $location, $routeParams) {
        var vm = this;
        vm.newTag = '';
        vm.alert = null;

        mediaService.getMediaById($routeParams.id).then((response) => {
            vm.media = response.data;
        }, (err) => {
            console.log(err);
        })

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
            mediaService.updateMedia(vm.media.id, vm.media).then((response) => {
                vm.alert = {type:'success', message:'Successfully saved'};
            }, (err) => {
                vm.alert = {type:'danger', message:'Error while updating media :' + err};
            });
        }
    });
})();
