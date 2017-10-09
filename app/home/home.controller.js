(function () {
  angular.module("media-app").controller("homeController",
    function homeController($scope, mediaService, $location) {
      var vm = this;
      vm.title = "Title";
      vm.filterTag = '';
      vm.filterPhoto = true;
      vm.filterGif = true;
      vm.filterVideo = false;
      vm.filteredmedia = [];
      vm.nbItemPerPage = 4;


      /*
      mediaService.getAllMedia().query(function (result) {
        vm.fullMedia = shuffle(result);
        vm.filterMedia();
      });

      mediaService.getMediaById().query({ id: '00001' }, function (result) {
        console.log(result);
      })
      
      vm.filteredmedia = vm.fullMedia;

      */
      vm.range = function (nb) {
        return range(nb);
      }
      vm.updateItemPerPage = function () {
        vm.setPagination();
        vm.getMediaPage();
      }
      vm.setPagination = function () {
        vm.page = 0;
        vm.nbPage = Math.ceil(vm.filteredmedia.length / vm.nbItemPerPage);
      }
      vm.getMediaPage = function () {
        vm.media = [];
        for (let i = vm.page * vm.nbItemPerPage; i < Math.min(vm.page * vm.nbItemPerPage + vm.nbItemPerPage, vm.filteredmedia.length); i++) {
          vm.media.push(vm.filteredmedia[i]);
        }
      }
      vm.setPage = function (index) {
        vm.page = index;
        vm.getMediaPage();
      }

      vm.filterMedia = function () {
        vm.filteredmedia = [];
        let tags = vm.filterTag.split(' ');
        tags = tags.filter(function (n) { return n.length != 0 })
        for (let i = 0; i < vm.fullMedia.length; i++) {
          let media = vm.fullMedia[i];
          if (tags.length !== 0) {
            for (let j = 0; j < media.tags.length; j++) {
              let tag = media.tags[j];
              for (let k = 0; k < tags.length; k++) {
                if (tag.indexOf(tags[k]) !== -1) {
                  vm.addMedia(media);
                  break;
                }
              }
            }
          } else {
            vm.addMedia(media);
          }
        }
        vm.updateItemPerPage();
      }



      vm.addMedia = function (media) {
        if (vm.filteredmedia.indexOf(media) !== -1) return;
        switch (media.type) {
          case "PHOTO":
            if (vm.filterPhoto) { vm.filteredmedia.push(media); } break;
          case "VIDEO":
            if (vm.filterVideo) { vm.filteredmedia.push(media); } break;
          case "GIF":
            if (vm.filterGif) { vm.filteredmedia.push(media); } break;
        }
      }

      vm.addFilterTag = function (tag) {
        if (vm.filterTag.length != 0)
          vm.filterTag += ' ';
        vm.filterTag += tag;
        vm.filterMedia();
      }

      vm.showDetails = function(media) {
        mediaService.setSelectedMedia(media);
        $location.path('/media/1')
      }

      vm.fullMedia = mediaService.getAllMedia();
      vm.filterMedia();
    });
})();