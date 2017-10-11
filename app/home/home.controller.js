(function () {
  angular.module("media-app").controller("homeController",
    function homeController($scope, mediaService, pagerService, $location, $document, $timeout) {
      var vm = this;
      vm.filterPhoto = true;
      vm.filterGif = true;
      vm.filterVideo = false;
      vm.nbItemPerPage = 10;
      vm.nbPage = 0;
      vm.pager = {};
      vm.totalMedia = 0;
      vm.tags = '';
      vm.isLoaded = false;
      vm.selectedMedia = {};
      vm.showModal = false;
      
      vm.encodeURIComponent = function(str) {
        return encodeURIComponent(str);
      }
      vm.generateQuery = function() {
        let query = '';
        if (vm.tags.length !== 0) {
          query += 'tags='
          let tags = vm.tags.split(',')
          for (let i = 0; i < tags.length; i++) {
            query += (i !== tags.length - 1) ? tags[i].trim() + ',' : tags[i].trim();
          }
        }
        query += (query.length !== 0) ? '&type=':'type=';
        if (vm.filterGif) query += 'gif';
        if (vm.filterPhoto) query += (query[query.length -1] !== '=') ? ',photo' : 'photo';
        if (vm.filterVideo) query += (query[query.length -1] !== '=') ? ',video' : 'video';
        return query;
      }

      vm.executeQuery = function(idx) {
        vm.pager.currentPage = idx ? idx : 1;
        let query = vm.generateQuery();
        mediaService.getMedias(query, (vm.pager.currentPage-1) * vm.nbItemPerPage, vm.nbItemPerPage).then((response) => {
          vm.media = response.data;
          mediaService.getMediasCount(query).then((res) => {   
            vm.nbPage = Math.ceil(res.data[0].nbMedias / vm.nbItemPerPage);
            vm.totalMedia = res.data[0].nbMedias;
            vm.pager = pagerService.GetPager(vm.totalMedia, vm.pager.currentPage, vm.nbItemPerPage);
            vm.isLoaded = true;

            if (vm.showModal) {
              vm.selectedMedia = vm.media[vm.sens * (vm.nbItemPerPage-1)];
            }
          });
        });
      }
      
      vm.setPage = function (index) {
        vm.isLoaded = false;
        if (index < 1 || index > vm.pager.totalPages) {
          return;
        }
        vm.executeQuery(index);
      }

      vm.addFilterTag = function (tag) {
        if(vm.tags.indexOf(tag) === -1) {
          if (vm.tags.length != 0 ) vm.tags += ', ';
          vm.tags += tag;
          vm.executeQuery();
        }
      }

      vm.showDetails = function(media) {
        vm.selectedMedia = media;
        vm.showModal = true;
        $timeout(() => {document.getElementById('detailsPopin').focus()}, 50);
        
      } 

      vm.getNext = function() {
        let index = vm.media.indexOf(vm.selectedMedia);
        if (index != vm.media.length -1) {
          vm.selectedMedia = vm.media[index + 1];
        } else {
          vm.sens = 0;
          vm.setPage(vm.pager.currentPage + 1);
        }
      }

      vm.getPrevious = function() {
        let index = vm.media.indexOf(vm.selectedMedia);
        if (index != 0) {
          vm.selectedMedia = vm.media[index - 1];
        } else {
          vm.sens = 1;
          vm.setPage(vm.pager.currentPage - 1);
        }
      }
      
      vm.executeQuery();

    });
})();
