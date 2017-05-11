/**
 * Created by Administrator on 2017/5/9.
 */
(function (angular) {
    var http = angular.module('movieCat.services.http',[]);
    http.service('HttpService',['$window','$document',function ($window,$document) {
        this.jsonp = function (url, data, callback) {
            var fnSuffix = Math.random().toString().replace('.','');
            var cbFuncName = "my_json_cb_" + fnSuffix;

            /*if(typeof data == 'function'){
                callback =data;
            }*/

            var querystring = url.indexOf('?') == -1 ? '?' : '&';
            for (var key in data){
                querystring += key + '=' + data[key] + '&';
            }
            querystring += 'callback=' + cbFuncName;

            var scriptElement = $document[0].createElement('script');
            scriptElement.src = url + querystring;

            $window[cbFuncName] = function (data) {
                callback(data);
                $document[0].body.appendChild(scriptElement);
            };
            $document[0].body.appendChild(scriptElement);
        }
    }])
})(angular);