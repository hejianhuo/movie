'use strict';

// Declare app level module which depends on views, and components
angular.module('movieCat', [
    'ngRoute',
    'movieCat.movie_detail',
    'movieCat.movie_list',
    'movieCat.direction.auto_focus',
])
    .constant('AppConfig',{
        pageSize:6,
        listApiAddress:'http://api.douban.com/v2/movie/',
        detailApiAddress:'http://api.douban.com/v2/movie/subject/',
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
    }])
    .controller('SearchController', ['$scope', '$route',
        function ($scope, $route) {
            $scope.input = '';
            $scope.search = function () {
                $route.updateParams({category:'search',q: $scope.input});
            }
        }
    ]);

/*导航栏加active*/
/*.controller('NavController', [
 '$scope',
 '$location',
 function ($scope, $location) {
 $scope.$loca = $location;
 $scope.$watch('$loca.path()', function (now) {
 if (now.startsWith('/in_theaters')) {
 $scope.type = 'in_theaters';
 } else if (now.startsWith('/coming_soon')) {
 $scope.type = 'coming_soon';
 } else if (now.startsWith('/top250')) {
 $scope.type = 'top250';
 }
 });
 }
 ])*/
