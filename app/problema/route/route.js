angular.module("alg-judge").config(["$routeProvider", function ($routeProvider) {
    var url = "app/problema/view/";

    $routeProvider.when("/problema-listagem", {
        templateUrl: url + "problema-listagem.html",
        controller: "problemaListagemController"
    });

    $routeProvider.when("/problema-cadastro", {
        templateUrl: url + "problema-cadastro.html",
        controller: "problemaCadastroController"
    });
}]);