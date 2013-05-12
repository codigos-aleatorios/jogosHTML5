/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */
var Inimigo = (function(Comportamento, carregadorRecursos, Sprite, GLOBAIS, ElementoAudio, MarioVoador) {
    "use strict";

    var Inimigo = function(config) {
        this.tipo = config.tipo;
        this.sprite = config.sprite;
        this.vidas = config.vidas;
        this.tempoQuandoIniciou = config.tempoQuandoIniciou || Date.now();
        this.sons = config.sons;
        this.tempoAnimacaoComportamentos = config.tempoAnimacaoComportamentos;
        this.multiplicadorPontos = config.multiplicadorPontos;
        this.sofreDano = config.sofreDano;

        //this. = Date.now()

    };
    Inimigo.prototype = {
        constructor: Inimigo,
        setDirecaoCimaBaixoDiagonal: function(agora) {
            var direcao;
            if (this.sprite.direcao === Sprite.DIRECAO.DIAGONAL_SUPERIOR_ESQUERDA) {
                direcao = Sprite.DIRECAO.DIAGONAL_INFERIOR_ESQUERDA;
            } else {
                direcao = Sprite.DIRECAO.DIAGONAL_SUPERIOR_ESQUERDA;
            }
            this.tempoQuandoIniciou = agora;
            this.sprite.setDirecao(direcao);

        },
        atualizaComportamento: function(fps) {
            var agora = Date.now();
            var tempoDecorridoDesteInicio = agora - this.tempoQuandoIniciou;

            if (this.tipo === "InimigoParaQueda") {
                //setar comportamneto atual de acordo  tempoDecorridoDesteInicio
                //e setar direcao da sprite

                //  debugger;
                var indiceComportamento = (Math.floor((this.sprite.comportamentos.length * tempoDecorridoDesteInicio) / this.tempoAnimacaoComportamentos)) % this.sprite.comportamentos.length;
                var novoComportamento = this.sprite.comportamentos[indiceComportamento];
                if (novoComportamento !== this.sprite.comportamentoAtual) {
                    this.sprite.setComportamentoAtual(novoComportamento);
                }
                this.sprite.setDirecao(this.sprite.comportamentoAtual.direcao);
                if (this.sprite.direcao === Sprite.DIRECAO.DIREITA ||
                        this.sprite.direcao === Sprite.DIRECAO.ESQUERDA) {
                    this.sprite.comportamentoAtual.modificadorDeGravidade = 0.6;
                    this.sprite.aplicarMovimentoX(fps);
                } else {
                    this.sprite.comportamentoAtual.modificadorDeGravidade = 0.3;
                }
                this.sprite.x -= (100) / fps;
            } else if (this.tipo === "InimigoTartaruga") {
                this.sprite.aplicarMovimentoX(fps);
            } else if (this.tipo === "InimigoTartarugaAzul") {


                if (tempoDecorridoDesteInicio >= this.tempoAnimacaoComportamentos) {
                    this.setDirecaoCimaBaixoDiagonal(agora);
                }

                this.sprite.aplicarMovimento(fps);





            } else if (this.tipo === "InimigoBalaDeCanhaoGigante") {
                this.sprite.x -= Math.floor(this.sprite.velocidade / fps);
            }

            this.sprite.executar(fps);
        },
        aplicarDano: function() {
            if (this.sofreDano) {
                this.vidas--;
                //console.log(this.vidas)
                if (this.vidas >= 0) {
                    this.sprite.pisca.iniciar();
                    this.sons.danoNoInimigo.play();
                }
            }
        }

    };

    Inimigo.criaInimigoBalaDeCanhaoGigante = function(mario) {

        var comportamentos = [
            Comportamento.criarComportamento({
                nome: "voando",
                loop: true,
                modificadorDeGravidade: 0,
                duracaoDaAnimacao: 400,
                frames: [
                    {
                        x: 228,
                        y: 277,
                        largura: 64,
                        altura: 64
                    }
                ]
            })
        ];

        var alturaPrimeiroFrame = comportamentos[0].frames[0].altura;
        // var maximoNoCanvas = Math.floor(GLOBAIS.ALTURA_CANVAS / alturaPrimeiroFrame);

        var marioFrameAtual = MarioVoador.sprite.comportamentoAtual.frames[MarioVoador.sprite.comportamentoAtual.indiceFrameAtual];
        var marioAltura = marioFrameAtual.altura;

        var diferencaMarioInimigo = Math.floor((alturaPrimeiroFrame - marioAltura) / 2);

        var x = GLOBAIS.LARGURA_CANVAS;
        var y = (mario.sprite.y + Math.floor(marioAltura / 2)) - diferencaMarioInimigo;

        return new Inimigo({
            tipo: "InimigoBalaDeCanhaoGigante",
            vidas: 99,
            multiplicadorPontos: 0,
            sofreDano: false,
            sprite: new Sprite({
                objImg: carregadorRecursos.get("recursos/img/inimigos.png"),
                /*
                 x: GLOBAIS.LARGURA_CANVAS,
                 y: Math.floor(Math.random() * maximoNoCanvas) * alturaPrimeiroFrame,
                 */
                x: x,
                y: y,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos[0], //getByName???
                direcao: Sprite.DIRECAO.ESQUERDA,
                espelhado: true,
                velocidade: 200, //pixels por segundo
                tempoTotalPiscando: 1000
            }),
            sons: {
                danoNoInimigo: ElementoAudio({
                    elementoAudio: carregadorRecursos.get("recursos/audio/snd/danoNoInimigo")
                }),
                tiroCanhao: ElementoAudio({
                    elementoAudio: carregadorRecursos.get("recursos/audio/snd/tiroCanhao")
                })
            }


        });
    };

    Inimigo.criaInimigoTartaruga = function() {

        var comportamentos = [
            Comportamento.criarComportamento({
                nome: "voando",
                loop: true,
                modificadorDeGravidade: 0,
                duracaoDaAnimacao: 400,
                sofreDano: true,
                frames: [
                    {
                        x: 59,
                        y: 39,
                        largura: 22,
                        altura: 28
                    },
                    {
                        x: 84,
                        y: 39,
                        largura: 17,
                        altura: 28
                    }
                ]
            })
        ];

        var alturaPrimeiroFrame = comportamentos[0].frames[0].altura;
        var maximoNoCanvas = Math.floor(GLOBAIS.ALTURA_CANVAS / alturaPrimeiroFrame);

        return new Inimigo({
            tipo: "InimigoTartaruga",
            vidas: 1,
            multiplicadorPontos: 2,
            sofreDano: true,
            sprite: new Sprite({
                objImg: carregadorRecursos.get("recursos/img/inimigos.png"),
                x: GLOBAIS.LARGURA_CANVAS,
                y: Math.floor(Math.random() * maximoNoCanvas) * alturaPrimeiroFrame,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos[0], //getByName???
                direcao: Sprite.DIRECAO.ESQUERDA,
                espelhado: true,
                velocidade: 20, //pixels por segundo
                tempoTotalPiscando: 1000
            }),
            sons: {
                danoNoInimigo: ElementoAudio({
                    elementoAudio: carregadorRecursos.get("recursos/audio/snd/danoNoInimigo")
                })
            }


        });
    };

    Inimigo.criaInimigoTartarugaAzul = function() {

        var comportamentos = [
            Comportamento.criarComportamento({
                nome: "voando",
                loop: true,
                modificadorDeGravidade: 0,
                duracaoDaAnimacao: 400,
                frames: [
                    {
                        x: 60,
                        y: 76,
                        largura: 22,
                        altura: 28
                    },
                    {
                        x: 85,
                        y: 76,
                        largura: 17,
                        altura: 28
                    }
                ]
            })
        ];

        var alturaPrimeiroFrame = comportamentos[0].frames[0].altura;
        var maximoNoCanvas = Math.floor(GLOBAIS.ALTURA_CANVAS / alturaPrimeiroFrame);

        var dir = [Sprite.DIRECAO.DIAGONAL_SUPERIOR_ESQUERDA,
            Sprite.DIRECAO.DIAGONAL_INFERIOR_ESQUERDA];


        return new Inimigo({
            tipo: "InimigoTartarugaAzul",
            vidas: 2,
            multiplicadorPontos: 5,
            tempoAnimacaoComportamentos: (Math.random() * 3000) + 1000,
            sofreDano: true,
            tempoQuandoIniciou: Date.now(),
            sprite: new Sprite({
                objImg: carregadorRecursos.get("recursos/img/inimigos.png"),
                x: GLOBAIS.LARGURA_CANVAS,
                y: Math.floor(Math.random() * maximoNoCanvas) * alturaPrimeiroFrame,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos[0], //getByName???
                direcao: dir[Math.floor(Math.random() * 1000 + 1) % dir.length],
                espelhado: true,
                velocidade: 50, //pixels por segundo
                tempoTotalPiscando: 1000
            }),
            sons: {
                danoNoInimigo: ElementoAudio({
                    elementoAudio: carregadorRecursos.get("recursos/audio/snd/danoNoInimigo")
                })
            }


        });
    };

    Inimigo.criaInimigoParaQueda = function() {

        var comportamentos = [
            Comportamento.criarComportamento({
                nome: "caindo",
                loop: true,
                modificadorDeGravidade: 0.3,
                duracaoDaAnimacao: 300,
                direcao: Sprite.DIRECAO.BAIXO,
                frames: [
                    {
                        x: 149,
                        y: 222,
                        largura: 20,
                        altura: 32
                    },
                    {
                        x: 210,
                        y: 222,
                        largura: 20,
                        altura: 32
                    }

                ]
            }),
            Comportamento.criarComportamento({
                nome: "caindoDireita",
                modificadorDeGravidade: 0.6,
                direcao: Sprite.DIRECAO.DIREITA,
                frames: [
                    {
                        x: 123,
                        y: 222,
                        largura: 25,
                        altura: 32
                    }

                ]
            }),
            Comportamento.criarComportamento({
                nome: "caindo",
                loop: true,
                modificadorDeGravidade: 0.3,
                duracaoDaAnimacao: 300,
                direcao: Sprite.DIRECAO.BAIXO,
                frames: [
                    {
                        x: 149,
                        y: 222,
                        largura: 20,
                        altura: 32
                    },
                    {
                        x: 210,
                        y: 222,
                        largura: 20,
                        altura: 32
                    }

                ]
            }),
            Comportamento.criarComportamento({
                nome: "caindoEsquerda",
                direcao: Sprite.DIRECAO.ESQUERDA,
                modificadorDeGravidade: 0.6,
                frames: [
                    {
                        x: 123,
                        y: 222,
                        largura: 23,
                        altura: 32,
                        espelhado: true
                    }

                ]
            })];

        var alturaPrimeiroFrame = comportamentos[0].frames[0].altura;
        //   var maximoNoCanvas = Math.floor(GLOBAIS.ALTURA_CANVAS / alturaPrimeiroFrame);

        return new Inimigo({
            tipo: "InimigoParaQueda",
            vidas: 0,
            tempoQuandoIniciou: Date.now(),
            multiplicadorPontos: 1,
            tempoAnimacaoComportamentos: 4000,
            sofreDano: true,
            sprite: new Sprite({
                objImg: carregadorRecursos.get("recursos/img/inimigos.png"),
                //Aleatorio de 1 a larugra do canvas
                //x: Math.floor((Math.random() * GLOBAIS.LARGURA_CANVAS) + 1),
                //y: (Math.floor(Math.random() * maximoNoCanvas) * alturaPrimeiroFrame),
                x: Math.floor((Math.random() * (GLOBAIS.LARGURA_CANVAS / 2)) + (GLOBAIS.LARGURA_CANVAS / 2)),
                y: -alturaPrimeiroFrame,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos[0], //getByName???
                direcao: Sprite.DIRECAO.BAIXO,
                velocidade: 90 //pixels por segundo
            })
        });
    };
    return Inimigo;
})(Comportamento, carregadorRecursos, Sprite, GLOBAIS, ElementoAudio, MarioVoador);