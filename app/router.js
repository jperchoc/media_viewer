(function() {
angular.module("media-app").config(function($routeProvider) {
     $routeProvider
        .when("/home", {
            templateUrl: "./app/home/home.part.html",
            controller: "homeController",
            controllerAs: 'vm',
            resolve: {
                function(mediaService) {
                    mediaService.initMedia();
                }
            } 
        })
        .when("/media/:id", {
            templateUrl: "./app/details/details.part.html",
            controller: "detailsController",
            controllerAs: 'vm',
            resolve: {
                //function(navigationService) {
                //    navigationService.active = "books"
                //}
            }
        })
        .otherwise({
            redirectTo:"/home"
        });
    });
})();