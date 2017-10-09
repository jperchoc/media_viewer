(function() {
    angular.module("media-app").factory("mediaService", mediaService);
    
    mediaService.$inject = ['$resource','$http','$q']
    
    function mediaService($resource, $http, $q) {
        var JSONFILE = 'mock.json';
        this.media = [];
        this.selectedMedia = null;

        return {
            initMedia:initMedia,
            getAllMedia:getAllMedia,
            getMediaById:getMediaById,
            setSelectedMedia:setSelectedMedia
        }

        function initMedia() {
            $resource('./app/mediaService/' + JSONFILE).query(function (result) {
                mediaService.media = result;
                console.log('media initialized')
            });
        }
        function getAllMedia() {
            return mediaService.media;//$resource('./app/mediaService/media.json');
        }

        function getMediaById(id) {
            //temp
            return mediaService.selectedMedia; //$resource('./app/mediaService/media.json', {id: '@id'});
        }

        function updateMediaById(id) {

        }

        function setSelectedMedia(media) {
            mediaService.selectedMedia = media;
        }
    }

    

})();
