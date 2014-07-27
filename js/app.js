var app = angular.module("app", ["ngRoute"]);

// Routes
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    // main route
    .when("/now-playing", {
        controller: "NowPlayingController",
        templateUrl: "views/NowPlayingControllerView.html"
    })

    // coming soon
    .when("/coming-soon", {
        controller: "ComingSoonController",
        templateUrl: "views/ComingSoonControllerView.html"
    })

    // no route matched
    .otherwise({
        redirectTo: "/now-playing"
    })
});

// Controllers
// NowPlayingController
app.controller("NowPlayingController", function($scope, nowPlayingMovieFactory) {
    $scope.nowPlayingMovies = [];

    nowPlayingMovieFactory.getNowPlaying().success(function(data) {
        $scope.nowPlayingMovies = data.movies;
        $scope.ready = true;
    })
});

// ComingSoonController
app.controller("ComingSoonController", function($scope, comingSoonMovieFactory) {
    $scope.comingSoonMovies = [];
    comingSoonMovieFactory.getComingSoon().success(function(data) {
        $scope.comingSoonMovies = data.movies;
        $scope.ready = true;
    });
});

// Factories
// nowPlayingMovieFactory
app.factory("nowPlayingMovieFactory", function($http) {
    var factory = {};
    factory.getNowPlaying = function() {
        var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json";
        var config = {
            params: {
                apikey: "36wumcjna6wkht48k2j2kdsk",
                callback: "JSON_CALLBACK",
                page_limit: 5,
                page: 1,
                country: "us"
            }
        }
        return $http.jsonp(url, config).success(function(res) {
            return res;
        })
    }
    return factory;
});

// comingSoonMovieFactory
app.factory("comingSoonMovieFactory", function($http) {
    var factory = {};
    factory.getComingSoon = function() {
        var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json";
        var config = {
            params: {
                apikey: "36wumcjna6wkht48k2j2kdsk",
                callback: "JSON_CALLBACK",
                page_limit: 5,
                page: 1,
                country: "us"
            }
        }
        return $http.jsonp(url, config).success(function(res) {
            return res;
        })
    }
    return factory;
});
