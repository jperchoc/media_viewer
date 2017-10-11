(function() {
    angular.module("media-app").factory("mediaService", mediaService);
    
    mediaService.$inject = ['$resource','$http','$q']
    
    function mediaService($resource, $http, $q) {

        var APIURL = "http://localhost:3000/"

        return {
            getMediasCount:getMediasCount,
            getMedias:getMedias,
            getMediaById:getMediaById,
            updateMedia:updateMedia,
            deleteMedia:deleteMedia
        }

        function getMedias(query, offset, limit) {
            if (query.length === 0) query = 'noquery';
            return $http.get(APIURL+'medias/query/'+query+'?offset='+offset+'&limit='+limit);
        }
        function getMediasCount(query, offset, limit) {
            if (query.length === 0) query = 'noquery';
            return $http.get(APIURL+'medias/query/'+query+'/count');
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
