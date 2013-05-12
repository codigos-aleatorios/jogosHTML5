/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */

var Explosao = (function(Comportamento, carregadorRecursos, Sprite, ElementoAudio) {
    "use strict";


    return   {
        getExplosao: function(x, y) {

            var comportamentos = {
                explode: Comportamento.criarComportamento({
                    modificadorDeGravidade: 0,
                    loop: false,
                    duracaoDaAnimacao: 500, //ms
                    frames: [
                        {x: 9, y: 7, largura: 68, altura: 65},
                        {x: 78, y: 7, largura: 68, altura: 65},
                        {x: 152, y: 7, largura: 68, altura: 65},
                        {x: 229, y: 7, largura: 68, altura: 65}
                    ]
                })};


            ElementoAudio({elementoAudio: carregadorRecursos.get("recursos/audio/snd/explode")}).play();
            return new Sprite({
                objImg: carregadorRecursos.get("recursos/img/explosao.png"),
                x: x,
                y: y,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos.explode,
                direcao: Sprite.DIRECAO.PARADO,
                velocidade: 200 //pixels por segundo
            });

        }

    };
})(Comportamento, carregadorRecursos, Sprite, ElementoAudio);