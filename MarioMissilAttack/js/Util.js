/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */
var Util = (function() {
    "use strict";
    return {
        configurarPadrao: function(configPadrao, configEnviada) {
            var retorno = {};
            configEnviada = configEnviada || {};
            for (var c in configPadrao) {
                retorno[c] = (configEnviada.hasOwnProperty(c)) ? configEnviada[c] : configPadrao[c];
            }
            return retorno;
        }
    };
})();

