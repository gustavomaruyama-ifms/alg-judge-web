angular.module("alg-judge").controller("navbarController", function($scope,$location){
    $scope.navigarPara= function(destino){
        $location.path("/"+destino);
    }
});