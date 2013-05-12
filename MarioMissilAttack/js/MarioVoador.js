/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */

var MarioVoador = (function(ElementoAudio, Comportamento, GLOBAIS, Sprite) {
    "use strict";
    return   {
        vidas: 2,
        sprite: null,
        sons: null,
        comportamentos: {},
        estrelas: 1, 
        tempoDoUltimoTiro: 0,
        tipoTiro: 1,
        quantidadeTiro: 1,
        tiros: [],
        imgTiro: null,
        atirar: function() {
            var agora = Date.now();
            if (agora - this.tempoDoUltimoTiro < 500) {
                return;
            }
            this.tempoDoUltimoTiro = agora;
            var comportamentos = {
                movimentando: Comportamento.criarComportamento({
                    modificadorDeGravidade: 0,
                    loop: true,
                    duracaoDaAnimacao: 300, //ms
                    frames: [
                        {x: 187, y: 0, largura: 7, altura: 4},
                        {x: 186, y: 8, largura: 9, altura: 4},
                        {x: 184, y: 16, largura: 11, altura: 4},
                        {x: 182, y: 24, largura: 13, altura: 4},
                        {x: 181, y: 40, largura: 14, altura: 4},
                        {x: 183, y: 48, largura: 12, altura: 4}
                    ]
                })

            };

            if (this.tipoTiro === 1 && this.quantidadeTiro === 1) {

                this.tiros.push(new Sprite({
                    corrigirY: true,
                    corrigirX: true,
                    objImg: this.imgTiro,
                    x: Math.floor(this.sprite.x + (this.sprite.comportamentoAtual.frames[this.sprite.comportamentoAtual.indiceFrameAtual].largura)),
                    y: Math.floor(this.sprite.y + (this.sprite.comportamentoAtual.frames[this.sprite.comportamentoAtual.indiceFrameAtual].altura) / 2),
                    comportamentos: comportamentos,
                    comportamentoAtual: comportamentos.movimentando,
                    direcao: Sprite.DIRECAO.DIREITA,
                    velocidade: 200 //pixels por segundo
                })
                        );
            } else {
                var metade = Math.floor(this.sprite.comportamentoAtual.frames[this.sprite.comportamentoAtual.indiceFrameAtual].altura / 2);
                var metadeDaMetade = Math.floor(metade / 2);

                for (var i = 0; i < this.quantidadeTiro; i++) {

                    if (this.tipoTiro === 1) {
                        this.tiros.push(new Sprite({
                            corrigirY: true,
                            corrigirX: true,
                            objImg: this.imgTiro,
                            x: Math.floor(this.sprite.x + (this.sprite.comportamentoAtual.frames[this.sprite.comportamentoAtual.indiceFrameAtual].largura) + (i * 15)),
                            y: this.sprite.y + metade,
                            comportamentos: comportamentos,
                            comportamentoAtual: comportamentos.movimentando,
                            direcao: Sprite.DIRECAO.DIREITA,
                            velocidade: 200 //pixels por segundo
                        }));
                    } else if (this.tipoTiro === 2) {
                        this.tiros.push(new Sprite({
                            corrigirY: true,
                            corrigirX: true,
                            objImg: this.imgTiro,
                            x: Math.floor(this.sprite.x + (this.sprite.comportamentoAtual.frames[this.sprite.comportamentoAtual.indiceFrameAtual].largura) + (i * 15)),
                            y: this.sprite.y + metadeDaMetade,
                            comportamentos: comportamentos,
                            comportamentoAtual: comportamentos.movimentando,
                            direcao: Sprite.DIRECAO.DIREITA,
                            velocidade: 200 //pixels por segundo
                        })
                                );

                        this.tiros.push(new Sprite({
                            corrigirY: true,
                            corrigirX: true,
                            objImg: this.imgTiro,
                            x: Math.floor(this.sprite.x + (this.sprite.comportamentoAtual.frames[this.sprite.comportamentoAtual.indiceFrameAtual].largura) + (i * 15)),
                            y: this.sprite.y + metade + metadeDaMetade,
                            //y: this.sprite.y + metade,

                            comportamentos: comportamentos,
                            comportamentoAtual: comportamentos.movimentando,
                            direcao: Sprite.DIRECAO.DIREITA,
                            velocidade: 200 //pixels por segundo
                        })
                                );
                    } else if (this.tipoTiro >= 3) {
                        this.tiros.push(new Sprite({
                            corrigirY: true,
                            corrigirX: true,
                            objImg: this.imgTiro,
                            x: Math.floor(this.sprite.x + (this.sprite.comportamentoAtual.frames[this.sprite.comportamentoAtual.indiceFrameAtual].largura) + (i * 15)),
                            y: this.sprite.y - metadeDaMetade,
                            comportamentos: comportamentos,
                            comportamentoAtual: comportamentos.movimentando,
                            direcao: Sprite.DIRECAO.DIREITA,
                            velocidade: 200 //pixels por segundo
                        })
                                );

                        this.tiros.push(new Sprite({
                            corrigirY: true,
                            corrigirX: true,
                            objImg: this.imgTiro,
                            x: Math.floor(this.sprite.x + (this.sprite.comportamentoAtual.frames[this.sprite.comportamentoAtual.indiceFrameAtual].largura) + (i * 15)),
                            y: this.sprite.y + metade,
                            //y: this.sprite.y + metade,

                            comportamentos: comportamentos,
                            comportamentoAtual: comportamentos.movimentando,
                            direcao: Sprite.DIRECAO.DIREITA,
                            velocidade: 200 //pixels por segundo
                        })
                                );

                        this.tiros.push(new Sprite({
                            corrigirY: true,
                            corrigirX: true,
                            objImg: this.imgTiro,
                            x: Math.floor(this.sprite.x + (this.sprite.comportamentoAtual.frames[this.sprite.comportamentoAtual.indiceFrameAtual].largura) + (i * 15)),
                            y: this.sprite.y + (metade * 2) + metadeDaMetade,
                            //y: this.sprite.y + metade,

                            comportamentos: comportamentos,
                            comportamentoAtual: comportamentos.movimentando,
                            direcao: Sprite.DIRECAO.DIREITA,
                            velocidade: 200 //pixels por segundo
                        })
                                );
                    }


                }
            }


            this.sons.atirar.play();
            //this.tiros.push(tiro);

        },
        aplicarDano: function() {
            this.vidas--;
            //console.log(this.vidas)
            if (this.vidas >= 0)
            {
                this.sprite.pisca.iniciar();
                this.sons.dano.play();
            }
            else
            {
                this.sprite.setComportamentoAtual(this.comportamentos.morrendo);
                this.sons.morrendo.play();
            }
        },
        reset: function() {
            this.vidas = 2;
            this.sprite.x = 10;
            this.sprite.y = GLOBAIS.ALTURA_CANVAS / 2;
            this.quantidadeTiro = 1;
            this.tipoTiro = 1;
            this.estrelas = 1;
        },
        init: function(jogo) {

            this.comportamentos = {
                paraCima: Comportamento.criarComportamento({
                    modificadorDeGravidade: 0,
                    frames: [
                        {x: 1, y: 29, largura: 28, altura: 28}


                    ],
                    duracaoDaAnimacao: 300, //ms
                    loop: true
                }),
                paraBaixo: Comportamento.criarComportamento({
                    modificadorDeGravidade: 0,
                    frames: [
                        {x: 69, y: 32, largura: 27, altura: 26},
                        {x: 102, y: 29, largura: 24, altura: 31}


                    ],
                    onFinalizaAnimacao: function(sprite) {
                        this.indiceFrameAtual = this.frames.length - 1;
                    },
                    duracaoDaAnimacao: 300, //ms
                    loop: false
                }),
                paraEsquerda: Comportamento.criarComportamento({
                    modificadorDeGravidade: 0,
                    frames: [
                        {x: 34, y: 30, largura: 29, altura: 28}


                    ],
                    duracaoDaAnimacao: 300, //ms
                    loop: true
                }),
                paraDireita: Comportamento.criarComportamento({
                    modificadorDeGravidade: 0,
                    frames: [
                        {x: 0, y: 0, largura: 28, altura: 26},
                        {x: 30, y: 0, largura: 28, altura: 26},
                        {x: 59, y: 0, largura: 30, altura: 26}

                    ],
                    duracaoDaAnimacao: 200, //ms
                    loop: true,
                    onFinalizaAnimacao: function(sprite) {
                        sprite.setComportamentoAtual(sprite.comportamentos.parado);
                    }
                }),
                parado: Comportamento.criarComportamento({
                    duracaoDaAnimacao: 500, //ms
                    modificadorDeGravidade: 0.3,
                    loop: true,
                    frames: [
                        {x: 0, y: 0, largura: 28, altura: 26},
                        {x: 30, y: 0, largura: 28, altura: 26},
                        {x: 59, y: 0, largura: 30, altura: 26}
                    ]
                }),
                morrendo: Comportamento.criarComportamento({
                    duracaoDaAnimacao: 3300,
                    modificadorDeGravidade: 2,
                    frames: [
                        {x: 94, y: 0, largura: 16, altura: 24}
                    ]
                })

            };
            var imgSprites = jogo.recursos.get("recursos/img/mario-MarioVoador.png");
            this.imgTiro = imgSprites;
            this.vidas = 2;
            this.sprite = new Sprite({
                corrigirX: true,
                objImg: imgSprites,
                x: 10,
                y: GLOBAIS.ALTURA_CANVAS / 2,
                comportamentoAtual: this.comportamentos.parado,
                comportamentos: this.comportamentos,
                velocidade: 160 //pixels por segundo
            });

            this.sons = {
                atirar: ElementoAudio({elementoAudio: jogo.recursos.get("recursos/audio/snd/tiro")}),
                dano: ElementoAudio({elementoAudio: jogo.recursos.get("recursos/audio/snd/dano")}),
                morrendo: ElementoAudio({elementoAudio: jogo.recursos.get("recursos/audio/snd/morrendo")})
            };

        }
    };



})(ElementoAudio, Comportamento, GLOBAIS, Sprite);

      