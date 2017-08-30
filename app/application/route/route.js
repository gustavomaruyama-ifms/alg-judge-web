angular.module("alg-judge").config(["$routeProvider",function($routeProvider){
    var url = "app/application/view/";

    $routeProvider.when("/",{
        templateUrl:url+"/home.html"
    });
}]);