/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */
var Fundo = (function(Sprite, Comportamento, GLOBAIS, carregadorRecursos, ElementoAudio) {
    "use strict";
    return {
        atualiza: function(fps) {
            this.sprite.aplicarMovimentoX(fps);

            this.sprite.executar(fps);

        },
        comportamentos: {
            movimentando: Comportamento.criarComportamento({
                modificadorDeGravidade: 0,
                indiceFrameAtual: 0,
                executar: function(sprite, fps) {
                    var comportamentoAtual = this;
                    var frameAtual = comportamentoAtual.frames[comportamentoAtual.indiceFrameAtual];

                    if (sprite.x <= -frameAtual.largura) {
                        sprite.x = 0;
                    }

                },
                frames: [
                    {x: 2, y: 2, largura: 512, altura: 432},
                    {x: 2, y: 438, largura: 512, altura: 432},
                    {x: 516, y: 438, largura: 512, altura: 432},
                    {x: 2, y: 1740, largura: 512, altura: 432}


                ]
            })
        },
        sprite: null,
        sons: null,
        mudarFundo: function(indice) {

            this.reset(indice);
        },
        reset: function(indice) {
            if (indice === undefined) {
                indice = 0;
            }
            this.comportamentos.movimentando.indiceFrameAtual = indice;
            this.sprite.x = 0;
            for (var i = 0; i < this.sons.length; i++) {
                try {
                    this.sons[i].currentTime = 0;
                } catch (eee) {
                }
                this.sons[i].pause();
            }
            this.sons[indice].play();
        },
        init: function() {
            this.sons = [
                ElementoAudio({elementoAudio: carregadorRecursos.get("recursos/audio/musica/1"), loop: true}),
                ElementoAudio({elementoAudio: carregadorRecursos.get("recursos/audio/musica/2"), loop: true}),
                ElementoAudio({elementoAudio: carregadorRecursos.get("recursos/audio/musica/3"), loop: true}),
                ElementoAudio({elementoAudio: carregadorRecursos.get("recursos/audio/musica/4"), loop: true})

            ];
            this.sons[0].play();



            this.sprite = Sprite.criarSprite({
                objImg: carregadorRecursos.get("recursos/img/fundo.png"),
                x: 0,
                y: 0,
                comportamentos: this.comportamentos,
                comportamentoAtual: this.comportamentos.movimentando,
                direcao: Sprite.DIRECAO.ESQUERDA,
                velocidade: 100, //pixels por segundo
                desenha: function(ctx) {  //mudar  parametro

                    var comportamentoAtual = this.comportamentoAtual;
                    var frameAtual = comportamentoAtual.frames[comportamentoAtual.indiceFrameAtual];

                    ctx.save();
                    // ctx.scale(GLOBAIS.ESCALA, GLOBAIS.ESCALA);



                    var y = frameAtual.altura - GLOBAIS.ALTURA_CANVAS;



                    //quantas imagens sao necessarias  para preencher a largura
                    //do canvas + 1
                    var qtd = Math.ceil(GLOBAIS.LARGURA_CANVAS / frameAtual.largura) + 1;
                    for (var i = 0; i < qtd; i++) {

                        ctx.drawImage(this.objImg, frameAtual.x, frameAtual.y,
                                frameAtual.largura, frameAtual.altura,
                                this.x + (i * frameAtual.largura), -y,
                                frameAtual.largura, frameAtual.altura);
                    }
                    ctx.restore();


                }
            });

        }

    };


})(Sprite, Comportamento, GLOBAIS, carregadorRecursos, ElementoAudio);

 