(function() {
    angular.module("media-app").factory("mediaService", mediaService);
    
    mediaService.$inject = ['$resource','$http','$q']
    
    function mediaService($resource, $http, $q) {
        var JSONFILE = 'mock.json';
        var APIURL = "http://localhost:3005/"
        this.media = [];
        this.selectedMedia = null;

        return {
            getAllMedia:getAllMedia,
            getMediaById:getMediaById,
            updateMedia:updateMedia,
            deleteMedia:deleteMedia
        }

        function getAllMedia() {
            return $http.get(APIURL+'medias');
        }

        function getMediaById(id) {
            return $http.get(APIURL+'medias/'+id)
        }

        function updateMedia(id, media) {
            console.log('updating media', media)
            return $http.put(APIURL+'medias/'+id, media, {})
        }

        function deleteMedia(id) {
            return $http.delete(APIURL+'medias/'+id)
        }
    }

    

})();
