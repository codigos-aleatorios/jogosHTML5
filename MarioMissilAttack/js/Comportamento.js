/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */
var Comportamento = (function(Util) {
    "use strict";
    var Comportamento = function(configComum) {
        configComum = Util.configurarPadrao({
            nome: "",
            duracaoDaAnimacao: 300,
            indiceFrameAtual: 0,
            indiceFrameAnterior: 0,
            modificadorDeGravidade: 1, // 1 = 100% 0.5 == 50%
            tempoQuandoIniciou: Date.now(),
            frames: [],
            loop: false,
            animacaoFinalizada: false


        }, configComum);

        this.duracaoDaAnimacao = configComum.duracaoDaAnimacao;
        this.indiceFrameAtual = configComum.indiceFrameAtual;
        this.indiceFrameAnterior = configComum.indiceFrameAnterior;

        this.modificadorDeGravidade = configComum.modificadorDeGravidade; // 1 = 100% 0.5 == 50%
        this.tempoQuandoIniciou = configComum.tempoQuandoIniciou;
        this.frames = configComum.frames;
        this.loop = configComum.loop;
        this.animacaoFinalizada = false;


    };
    Comportamento.prototype = {
        constructor: Comportamento,
        reset: function() {
            this.indiceFrameAtual = 0;
            this.tempoQuandoIniciou = Date.now();
            this.animacaoFinalizada = false;
        },
        ajusteYEntreFramesDoComportamento: function(sprite) {
            var comportamento = sprite.comportamentoAtual;
            var frameAnterior = comportamento.frames[comportamento.indiceFrameAnterior];
            var frameNovo = comportamento.frames[comportamento.indiceFrameAtual];

            sprite.ajustarYEntreFrames(frameAnterior, frameNovo);
        },
        ajusteXEntreFramesDoComportamento: function(sprite) {
            var comportamento = sprite.comportamentoAtual;
            var frameAnterior = comportamento.frames[comportamento.indiceFrameAnterior];
            var frameNovo = comportamento.frames[comportamento.indiceFrameAtual];

            sprite.ajustarXEntreFrames(frameAnterior, frameNovo);
        },
        atualizarComportamento: function(sprite, fps) {
            this.executar(sprite, fps);
            if (sprite.corrigirY) {
                this.ajusteYEntreFramesDoComportamento(sprite);
            }
            if (sprite.corrigirX) {
                this.ajusteXEntreFramesDoComportamento(sprite);
            }
            //guarda qual foi o ultimo frame 
            this.indiceFrameAnterior = this.indiceFrameAtual;

        },
        executar: function(sprite, fps) {
            if (this.animacaoFinalizada || this.frames.length === 0) {
                return;
            }
            var agora = Date.now();
            var tempoDecorridoDesteInicio = agora - this.tempoQuandoIniciou;

            /*  duracaoDaAnimacao == (frames.length)
             tempoDecorridoDesteUltimoFrame = x
             x* duracaoDaAnimacao = (frames.length  )*tempoDecorridoDesteUltimoFrame;
             x = (frames.length  )*tempoDecorridoDesteUltimoFrame / duracaoDaAnimacao*/
            this.indiceFrameAtual = (Math.floor((this.frames.length * tempoDecorridoDesteInicio) / this.duracaoDaAnimacao)) % this.frames.length;
            if (tempoDecorridoDesteInicio >= this.duracaoDaAnimacao && !this.loop) {
                this.animacaoFinalizada = true;
                this.onFinalizaAnimacao(sprite);
            }

        },
        onFinalizaAnimacao: function(sprite) {


        }

    };
    Comportamento.criarComportamento = function(config) {

        var obj = new Comportamento(config);//
        for (var i in config) {
            if (!obj.hasOwnProperty(i)) {//sobreescreve so se nao tem no this //
                obj[i] = config[i];
            }
        }
        return obj;
    };
    return Comportamento;
})(Util);


     