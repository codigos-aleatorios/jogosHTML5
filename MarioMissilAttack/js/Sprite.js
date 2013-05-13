/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */
var Sprite = (function(Util, GLOBAIS) {
    "use strict";

    var Sprite = function(config) {
        config = Util.configurarPadrao({
            x: 0,
            y: 0,
            objImg: null,
            espelhado: false,
            comportamentoAnterior: null,
            comportamentoAtual: null,
            comportamentos: null,
            gravidade: 100,
            velocidade: 200, // pixels por segundo no eixo x e y
            direcao: Sprite.DIRECAO.PARADO,
            corrigirY: false,
            corrigirX: false,
            tempoTotalPiscando: 2000

        }, config);
        this.objImg = config.objImg;
        this.x = config.x;
        this.y = config.y;
        // this.tempo = config.tempo;
        this.espelhado = config.espelhado;

        this.comportamentoAnterior = config.comportamentoAnterior;
        this.comportamentoAtual = config.comportamentoAtual;
        this.comportamentos = config.comportamentos;
        // this.frames = config.frames;
        this.gravidade = config.gravidade;
        this.velocidade = config.velocidade; // pixels por segundo  
        //  this.caindo = true;
        this.direcao = config.direcao;
        this.corrigirY = config.corrigirY; //
        this.corrigirX = config.corrigirX; //
        this.podeDesenhar = true;
        this.tempoTotalPiscando = config.tempoTotalPiscando;
        this.pisca = {
            piscando: false,
            tempoTotalPiscando: this.tempoTotalPiscando,
            tempoInicio: 0,
            tempoEntrePisca: 100,
            iniciar: function() {
                if (this.piscando) {
                    return;
                }
                this.piscando = true;
                this.tempoInicio = Date.now();
            },
            executar: function(sprite) {
                var agora = Date.now();
                if (agora - this.tempoInicio >= this.tempoTotalPiscando) {
                    sprite.podeDesenhar = true;
                    this.piscando = false;
                    return;
                }
                //se for par desenha senao nao				 
                sprite.podeDesenhar = (Math.floor((agora - this.tempoInicio) / this.tempoEntrePisca) % 2 === 0);

            }

        };

    };

    Sprite.prototype.verificaSeUltrapassouLimitesDoCanvas = function(config) {
        var frameAtual = this.comportamentoAtual.frames[this.comportamentoAtual.indiceFrameAtual];
        var largura = frameAtual.largura;
        var altura = frameAtual.altura;
        var x = this.x;
        var y = this.y;
        config = config || {};
        return ((x + largura < 0 && config.esquerda) ||
                (x > GLOBAIS.LARGURA_CANVAS && config.direita) ||
                (y + altura < 0 && config.topo) ||
                (y > GLOBAIS.ALTURA_CANVAS && config.baixo));

    };
    Sprite.prototype.verificaSeColidiuLimitesDoCanvas = function() {
        var frameAtual = this.comportamentoAtual.frames[this.comportamentoAtual.indiceFrameAtual];
        var largura = frameAtual.largura;
        var altura = frameAtual.altura;
        var x = this.x;
        var y = this.y;

        return {
            esquerda: (x < 0),
            direita: (x + largura > GLOBAIS.LARGURA_CANVAS),
            topo: (y < 0),
            baixo: (y + altura > GLOBAIS.ALTURA_CANVAS)
        };

    };

    Sprite.prototype.verificaColisaoComSprite = function(spriteB) {
        var spriteA = this;
        var frameAtualA = spriteA.comportamentoAtual.frames[spriteA.comportamentoAtual.indiceFrameAtual];
        var frameAtualB = spriteB.comportamentoAtual.frames[spriteB.comportamentoAtual.indiceFrameAtual];

        // e SE TIVER ESPELHADO ????? ?  nada a ver??? 
        var xA = spriteA.x,
                yA = spriteA.y,
                larguraA = frameAtualA.largura,
                alturaA = frameAtualA.altura,
                xB = spriteB.x,
                yB = spriteB.y,
                larguraB = frameAtualB.largura,
                alturaB = frameAtualB.altura;
        /*    var colideX = (  xA <= (xB + larguraB)  &&
         (xA + larguraA) >= xB );
         
         var colideY =  (  yA <= (yB + alturaB)  &&
         (yA + alturaA) >= yB) ;
         */
        return (((xA >= xB && xA <= (xB + larguraB)) ||
                (xA <= xB && (xA + larguraA) >= xB)) &&
                ((yA >= yB && yA <= (yB + alturaB)) ||
                        (yA <= yB && (yA + alturaA) >= yB)));

    };
    Sprite.DIRECAO = {
        PARADO: 0,
        BAIXO: 1,
        CIMA: 2,
        ESQUERDA: 3,
        DIREITA: 4,
        DIAGONAL_SUPERIOR_ESQUERDA: 5,
        DIAGONAL_SUPERIOR_DIREITA: 6,
        DIAGONAL_INFERIOR_ESQUERDA: 7,
        DIAGONAL_INFERIOR_DIREITA: 9
    };
    Sprite.criarSprite = function(config) {

        var obj = new Sprite(config); //
        for (var i in config) {
            if (!obj.hasOwnProperty(i)) { //sobreescreve so se nao tem no this //
                obj[i] = config[i];
            }
        }
        return obj;
    };

    Sprite.prototype.setDirecao = function(d) {
        this.direcao = d;
    };

    Sprite.prototype.getNomeComportamento = function(comportamento) {
        for (var n in this.comportamentos) {
            if (comportamento === this.comportamentos[n]) {
                return n;
            }
        }
        return "";
    };

    Sprite.prototype.desenha = function(ctx) {
        if (!this.podeDesenhar) {
            return;
        }
        var comportamentoAtual = this.comportamentoAtual;

        var frameAtual = comportamentoAtual.frames[comportamentoAtual.indiceFrameAtual];

        ctx.save();


        if (this.espelhado || frameAtual.espelhado) {
            ctx.translate(frameAtual.largura + (this.x * 2), 0);
            ctx.scale(-1, 1);

        }
        //  console.log(comportamentoAtual.indiceFrameAtual);
        ctx.drawImage(this.objImg, frameAtual.x, frameAtual.y,
                frameAtual.largura, frameAtual.altura,
                this.x, this.y,
                frameAtual.largura, frameAtual.altura);
        ctx.restore();

    };
    Sprite.prototype.ajustarXEntreFrames = function(frameAnterior, frameNovo) {

        if (frameAnterior.largura !== frameNovo.largura) {
            //AJUSTAR o eixo x da sprite 
            var dif = Math.abs(frameAnterior.largura - frameNovo.largura);
            if (frameAnterior.largura > frameNovo.largura) {
                this.x += dif;
            } else {
                this.x -= dif;
            }
        }
    };
    Sprite.prototype.ajustarYEntreFrames = function(frameAnterior, frameNovo) {

        if (frameAnterior.altura !== frameNovo.altura) {
            //AJUSTAR o eixo y da sprite 
            var dif = Math.abs((frameAnterior.altura) - (frameNovo.altura));
            if (frameAnterior.altura > frameNovo.altura) {
                this.y += dif;
            } else {
                this.y -= dif;
            }
        }
    };
    Sprite.prototype.setComportamentoAtual = function(comportamento) {
        //CRIAR  by name
        //setComportamentoAtual("nomeComprortamento")
        //for no this.comportamnet buscando pelo nome
        this.comportamentoAnterior = this.comportamentoAtual;
        this.comportamentoAtual = comportamento;
        this.comportamentoAtual.reset();
        //---------------
        var comportamentoAnterior = this.comportamentoAnterior;
        var frameAnterior = comportamentoAnterior.frames[comportamentoAnterior.indiceFrameAtual];
        var frameNovo = comportamento.frames[comportamento.indiceFrameAtual];

        //corrigir  Y  entre comportamento
        if (comportamentoAnterior !== null && this.corrigirY) {

            this.ajustarYEntreFrames(frameAnterior, frameNovo);
        }

        //corrigir  X  entre comportamento
        if (comportamentoAnterior !== null && this.corrigirX) {

            this.ajustarXEntreFrames(frameAnterior, frameNovo);
        }

    };

    Sprite.prototype.aplicarGravidade = function(fps) {
        this.y += ((this.gravidade * this.comportamentoAtual.modificadorDeGravidade) / fps); //Math.floor((this.gravidade * this.comportamentoAtual.modificadorDeGravidade) / fps);

    };

    Sprite.prototype.executar = function(fps) {
        this.aplicarGravidade(fps);
        this.comportamentoAtual.atualizarComportamento(this, fps);
        if (this.pisca.piscando) {
            this.pisca.executar(this);
        }

    };

    Sprite.prototype.aplicarMovimento = function(fps) {
        this.aplicarMovimentoX(fps);
        this.aplicarMovimentoY(fps);
    };
    Sprite.prototype.aplicarMovimentoX = function(fps) {
        var deslocamento = this.velocidade / fps;
        if (this.direcao === Sprite.DIRECAO.ESQUERDA ||
                this.direcao === Sprite.DIRECAO.DIAGONAL_INFERIOR_ESQUERDA ||
                this.direcao === Sprite.DIRECAO.DIAGONAL_SUPERIOR_ESQUERDA) {
            this.x -= deslocamento;
        } else if (this.direcao === Sprite.DIRECAO.DIREITA ||
                this.direcao === Sprite.DIRECAO.DIAGONAL_INFERIOR_DIREITA ||
                this.direcao === Sprite.DIRECAO.DIAGONAL_SUPERIOR_DIREITA) {
            this.x += deslocamento;
        }
    };

    Sprite.prototype.aplicarMovimentoY = function(fps) {
        var deslocamento = this.velocidade / fps;
        if (this.direcao === Sprite.DIRECAO.CIMA ||
                this.direcao === Sprite.DIRECAO.DIAGONAL_SUPERIOR_DIREITA ||
                this.direcao === Sprite.DIRECAO.DIAGONAL_SUPERIOR_ESQUERDA) {
            this.y -= deslocamento;
        } else if (this.direcao === Sprite.DIRECAO.BAIXO ||
                this.direcao === Sprite.DIRECAO.DIAGONAL_INFERIOR_DIREITA ||
                this.direcao === Sprite.DIRECAO.DIAGONAL_INFERIOR_ESQUERDA) {
            this.y += deslocamento;
        }
    };
    /*
     * entao se a velocidade é 80 pixels por segundo
     
     PERGUNTA:
     quantos pixels ele tem que andar a cada loop ???
     Se taxa fps atual é 30
     então:
     velocidade = 80 pixels por segundo
     fps: 30 (nesta taxa 1 segundo gera 30 loops )
     
     em 30 loops ele deve andar 80 pixels
     em 1 loop ele deve andar x pixels
     Regra de 3 :
     loops pixels
     30 == 80
     1 == x
     --------------------------------------
     30x == 80
     x == 80/30
     
     x = velocidade /fps
     * 
     * 
     */

    return Sprite;
})( Util, GLOBAIS);
/*
 * o aplicar movimento  da sprite   nao deve ser  chamado no le entrada e ele
so pode ser chamado automaticamente no Sprite.prototype.executar 

Na entrada  soh devemos  setar direcao e comportamento e la no Sprite.prototype.executar ele ja vai movimentar de acordo
com a direcao


no  Sprite.prototype.executar   devemos colocar por ultimo o 
 Sprite.prototype.aplicarMovimento
 * 
 */