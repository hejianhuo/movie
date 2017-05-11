/**
 * Created by Administrator on 2017/5/10.
 */
(function (angular) {
    angular.module('movieCat.direction.auto_focus', [])
        .directive('autoFocus', ['$location', function ($location) {
            var path = $location.path();
            return {
                restrict: 'A',
                link:function ($scope, iElm, iAttrs, controller) {
                    /*var aLink = iElm.children().attr('href');
                    var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
                    console.log(type);
                    if(path.startsWith(type)){
                        iElm.addClass('active');
                    }
                    iElm.on('click',function () {
                        iElm.parent().children().removeClass('active');
                        iElm.addClass('active');
                    })*/
                    $scope.$location = $location;
                    $scope.$watch('$location.path()',function (now) {
                        var aLink = iElm.children().attr('href');
                        var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');

                        if(now.startsWith(type)){
                            iElm.parent().children().removeClass('active');

                            iElm.addClass('active');
                        }
                    });
                }
            }
        }])
})(angular);
