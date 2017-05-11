(function (angular) {
    'use strict';
    //创建正在热映模块
    var module = angular.module('movieCat.movie_list', ['ngRoute', 'movieCat.services.http']);

    //配置模块的路由
    module.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:category/:page', {
            templateUrl: 'movie_list/view.html',
            controller: 'MovieListController'
        });
    }]);

    module.controller('MovieListController', [
        '$scope',
        '$route',
        '$routeParams',
        'HttpService',
        'AppConfig',
        function ($scope, $route, $routeParams, HttpService,AppConfig) {
            var page = parseInt($routeParams.page);   //得到当前页
            var count = AppConfig.pageSize;
            var start = (page - 1) * count;

            $scope.loading = true;
            $scope.subjects = [];
            $scope.message = '';
            $scope.totalCount = 0;
            $scope.totalPages = 0;
            $scope.currentPage = page;
            $scope.title = 'loading...';

            HttpService.jsonp(AppConfig.listApiAddress + $routeParams.category,
                {'count': count, 'start': start,q:$routeParams.q},
                function (data) {
                    $scope.subjects = data.subjects;
                    $scope.title = data.title;
                    $scope.totalCount = data.total;
                    $scope.totalPages = Math.ceil($scope.totalCount / count);
                    $scope.loading = false;
                    //$apply的作用让指定表达式重新同步
                    $scope.$apply();
                });

            //翻页
            $scope.pageGo = function (page) {
                if(page >=1 && page<= $scope.totalPages){
                    $route.updateParams({page: page});
                }
            }

        }]);
})(angular);
/*本地请求*/
/*function ($scope, $http) {
 $scope.subjects = [];
 $scope.message = '';
 $http.get('/app/datas/movie_list.json').then(function (res) {
 if (res.status == 200) {
 $scope.subjects = res.data.subjects;
 } else {
 $scope.message = '获取数据错误,错误信息:' + res.statusText;
 }
 }), function (err) {
 $scope.message = '获取数据错误,错误信息:' + err.statusText;
 }*/

/*//异步请求,跨域
 function ($scope, $http) {
 $scope.subjects = [];
 $scope.message = '';
 // 在Angular中使用JSONP的方式做跨域请求，
 var doubanApiAddress = 'http://api.douban.com/v2/movie/movie_list';
 // 就必须给当前地址加上一个参数 callback=JSON_CALLBACK
 $http.jsonp(doubanApiAddress + '?callback=JSON_CALLBACK').then(function (res) {
 // 此处代码是在异步请求完成过后才执行（需要等一段时间）
 if (res.status == 200) {
 $scope.subjects = res.data.subjects;
 } else {
 $scope.message = '获取数据错误,错误信息:' + res.statusText;
 }
 }), function (err) {
 $scope.message = '获取数据错误,错误信息:' + err.statusText;
 }*/