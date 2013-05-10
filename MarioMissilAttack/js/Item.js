/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */

var Item = (function(Comportamento, carregadorRecursos, Sprite, GLOBAIS, ElementoAudio) {
    "use strict";
    var Item = function(config) {
        this.tipo = config.tipo;
        this.sprite = config.sprite;
        this.sons = config.sons;
        this.pontos = config.pontos;
    };

    Item.prototype = {
        constructor: Item,
        executar: function(fps) {
            this.sprite.aplicarMovimentoX(fps);
            this.sprite.executar(fps);
        }
    };

    Item.criaItemMoeda = function(x, y) {
        var comportamentos = [
            Comportamento.criarComportamento({
                nome: "brilha",
                loop: true,
                modificadorDeGravidade: 0,
                duracaoDaAnimacao: 400,
                frames: [{
                        x: 219,
                        y: 28,
                        largura: 12,
                        altura: 16
                    }, {
                        x: 232,
                        y: 28,
                        largura: 8,
                        altura: 16
                    }, {
                        x: 241,
                        y: 28,
                        largura: 6,
                        altura: 16
                    }, {
                        x: 248,
                        y: 28,
                        largura: 8,
                        altura: 16
                    }
                ]
            })
        ];

        return new Item({
            tipo: "ItemMoeda",
            pontos: 100,
            sprite: new Sprite({
                objImg: carregadorRecursos.get("recursos/img/itens.png"),
                x: x,
                y: y,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos[0], //getByName???
                direcao: Sprite.DIRECAO.ESQUERDA,
                espelhado: true,
                velocidade: 100 //pixels por segundo
            }),
            sons: {
                pegar: ElementoAudio({
                    elementoAudio: carregadorRecursos.get("recursos/audio/snd/pegaMoeda")
                })
            }
        });
    };

    Item.criaItemCogumelo = function(x, y) {
        var comportamentos = [
            Comportamento.criarComportamento({
                nome: "brilha",
                loop: true,
                modificadorDeGravidade: 0,
                duracaoDaAnimacao: 400,
                frames: [{
                        x: 308,
                        y: 30,
                        largura: 16,
                        altura: 16
                    }
                ]
            })
        ];

        return new Item({
            tipo: "ItemCogumelo",
            pontos: 0,
            sprite: new Sprite({
                objImg: carregadorRecursos.get("recursos/img/itens.png"),
                x: x,
                y: y,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos[0], //getByName???
                direcao: Sprite.DIRECAO.ESQUERDA,
                espelhado: true,
                velocidade: 100 //pixels por segundo
            }),
            sons: {
                pegar: ElementoAudio({
                    elementoAudio: carregadorRecursos.get("recursos/audio/snd/vida")
                })
            }
        });
    };

    Item.criaItemCogumeloVermelho = function(x, y) {
        var comportamentos = [
            Comportamento.criarComportamento({
                nome: "brilha",
                loop: true,
                modificadorDeGravidade: 0,
                duracaoDaAnimacao: 400,
                frames: [{
                        x: 291,
                        y: 30,
                        largura: 16,
                        altura: 16
                    }
                ]
            })
        ];

        return new Item({
            tipo: "ItemCogumeloVermelho",
            pontos: 0,
            sprite: new Sprite({
                objImg: carregadorRecursos.get("recursos/img/itens.png"),
                x: x,
                y: y,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos[0], //getByName???
                direcao: Sprite.DIRECAO.ESQUERDA,
                espelhado: true,
                velocidade: 100 //pixels por segundo
            }),
            sons: {
                pegar: ElementoAudio({
                    elementoAudio: carregadorRecursos.get("recursos/audio/snd/cogumelo")
                })
            }
        });
    };

    Item.criaItemEstrela = function(x, y) {
        var comportamentos = [
            Comportamento.criarComportamento({
                nome: "brilha",
                loop: true,
                modificadorDeGravidade: 0,
                duracaoDaAnimacao: 400,
                frames: [{
                        x: 274,
                        y: 13,
                        largura: 15,
                        altura: 16
                    }
                ]
            })
        ];

        return new Item({
            tipo: "ItemEstrela",
            pontos: 0,
            sprite: new Sprite({
                objImg: carregadorRecursos.get("recursos/img/itens.png"),
                x: x,
                y: y,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos[0], //getByName???
                direcao: Sprite.DIRECAO.ESQUERDA,
                espelhado: true,
                velocidade: 100 //pixels por segundo
            }),
            sons: {
                pegar: ElementoAudio({
                    elementoAudio: carregadorRecursos.get("recursos/audio/snd/cogumelo")
                })
            }
        });
    };

    Item.criaItemFlorzinha = function(x, y) {
        var comportamentos = [
            Comportamento.criarComportamento({
                nome: "brilha",
                loop: true,
                modificadorDeGravidade: 0,
                duracaoDaAnimacao: 400,
                frames: [{
                        x: 274,
                        y: 30,
                        largura: 16,
                        altura: 16
                    }
                ]
            })
        ];

        return new Item({
            tipo: "ItemFlorzinha",
            pontos: 0,
            sprite: new Sprite({
                objImg: carregadorRecursos.get("recursos/img/itens.png"),
                x: x,
                y: y,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos[0], //getByName???
                direcao: Sprite.DIRECAO.ESQUERDA,
                espelhado: true,
                velocidade: 100 //pixels por segundo
            }),
            sons: {
                pegar: ElementoAudio({
                    elementoAudio: carregadorRecursos.get("recursos/audio/snd/cogumelo")
                })
            }
        });
    };

    Item.criaItemMoedaAzul = function(x, y) {
        var comportamentos = [
            Comportamento.criarComportamento({
                nome: "brilha",
                loop: true,
                modificadorDeGravidade: 0,
                duracaoDaAnimacao: 400,
                frames: [{
                        x: 219,
                        y: 45,
                        largura: 12,
                        altura: 16
                    }, {
                        x: 232,
                        y: 45,
                        largura: 8,
                        altura: 16
                    }, {
                        x: 241,
                        y: 45,
                        largura: 6,
                        altura: 16
                    }, {
                        x: 248,
                        y: 45,
                        largura: 8,
                        altura: 16
                    }
                ]
            })
        ];

        return new Item({
            tipo: "ItemMoedaAzul",
            pontos: 200,
            sprite: new Sprite({
                objImg: carregadorRecursos.get("recursos/img/itens.png"),
                x: x,
                y: y,
                comportamentos: comportamentos,
                comportamentoAtual: comportamentos[0], //getByName???
                direcao: Sprite.DIRECAO.ESQUERDA,
                espelhado: true,
                velocidade: 100 //pixels por segundo
            }),
            sons: {
                pegar: ElementoAudio({
                    elementoAudio: carregadorRecursos.get("recursos/audio/snd/pegaMoeda")
                })
            }
        });
    };
    return Item;
})(Comportamento, carregadorRecursos, Sprite, GLOBAIS, ElementoAudio);