(function (angular) {
    'use strict';
    //创建详细模块
    var module = angular.module('movieCat.movie_detail', ['ngRoute', 'movieCat.services.http']);

    //配置模块的路由
    module.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/detail/:id', {
            templateUrl: 'movie_detail/view.html',
            controller: 'MovieDetailController'
        });
    }]);

    module.controller('MovieDetailController', [
        '$scope',
        '$route',
        '$routeParams',
        'HttpService',
        'AppConfig',
        function ($scope, $route, $routeParams, HttpService,AppConfig) {
            var apiAddress =AppConfig.detailApiAddress + $routeParams.id;
            $scope.loading = true;
            $scope.movie = {};
            HttpService.jsonp(apiAddress,
                /*{'count': count, 'start': 0,q:$routeParams.q},*/
                {},
                function (data) {
                    $scope.movie = data;
                    $scope.loading = false;
                    //$apply的作用让指定表达式重新同步
                    $scope.$apply();
                });



        }]);
})(angular);
