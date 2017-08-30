angular.module("alg-judge").factory("problemaAPIService", function ($http, config) {

    var url = config.baseUrl + "problema";

    /**
     * ACESSA o webservice para inclusao de um novo problema
     * @param problema
     * @returns {*}
     * @private
     */
    var _inserirProblema = function (problema) {
        return $http({
            method: "POST",
            url: url,
            data: problema,
            skipAuthorization: true
        })
    };

    /**
     * ACESSA o webservice para listar problemas
     * @param problema
     * @returns {*}
     * @private
     */
    var _listarProblemas = function (qtde) {
        return $http({
            method: "GET",
            url: url + "/list/" + qtde,
            skipAuthorization: true
        })
    };

    return {
        inserirProblema: _inserirProblema,
        listarProblemas: _listarProblemas
    };
});