/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */
var Jogo = (function(MarioVoador, Sprite, Explosao, GLOBAIS, Inimigo, Fundo, carregadorRecursos, Item, ElementoAudio) {
    "use strict";
 
    return {
        telaDeInicio: true,
        nivel: 1,
        gameOver: false,
        MarioVoador: null,
        Cenario: null,
        teclado: null,
        recursos: null,
        ElementoAudio: null,
        Comportamento: null,
        canvas: null,
        ctx: null,
        pontos: 0,
        fps: 60, //inicial
        ultimoLoop: 0, //tempo
        itens: [],
        explosoes: [],
        inimigos: [],
        ultimoInimigo: 0,
        ultimoInimigoTiroCanhaoGigante: 0,
        adicionaInimigo: function() {
            var agora = Date.now();
            var tempo = 2000;

            if (this.nivel === 4) {
                if (this.ultimoInimigoTiroCanhaoGigante === 0 || (agora - this.ultimoInimigoTiroCanhaoGigante) >= 5000) {
                    this.ultimoInimigoTiroCanhaoGigante = agora;
                    var ini = Inimigo.criaInimigoBalaDeCanhaoGigante(MarioVoador);
                    ini.sons.tiroCanhao.play();
                    this.inimigos.push(ini);
                }
            }

            if (agora - this.ultimoInimigo > (Math.floor((Math.random() * tempo) + tempo))) {
                this.ultimoInimigo = agora;


                if (this.nivel === 1) {
                    this.inimigos.push(Inimigo.criaInimigoTartaruga());
                } else if (this.nivel === 2) {
                    this.inimigos.push(Inimigo.criaInimigoTartaruga());
                    this.inimigos.push(Inimigo.criaInimigoParaQueda());
                } else if (this.nivel >= 3) {
                    this.inimigos.push(Inimigo.criaInimigoTartaruga());
                    this.inimigos.push(Inimigo.criaInimigoParaQueda());
                    this.inimigos.push(Inimigo.criaInimigoTartarugaAzul());
                    this.inimigos.push(Inimigo.criaInimigoTartaruga());
                    this.inimigos.push(Inimigo.criaInimigoParaQueda());
                    this.inimigos.push(Inimigo.criaInimigoTartarugaAzul());
                }
            
            }

        },
        inicializarEntidades: function() {
            this.atualizaRankHtml();
            MarioVoador.init(this);
            Fundo.init();

            //
        },
        iniciarJogo: function() {
            this.telaDeInicio = false;
            Fundo.sprite.setDirecao(Sprite.DIRECAO.ESQUERDA);
            Fundo.sprite.setComportamentoAtual(Fundo.sprite.comportamentos.movimentando);
            Fundo.sons[0].play();

        },
        reset: function() {
            var maiorPontuacao = localStorage.getItem("rank") || 0;

            if (this.pontos > maiorPontuacao) {
                localStorage.setItem("rank", this.pontos);
                this.pause();
				//falta criar um modal para o canvas
                alert("Parabéns! você conseguiu a maior pontuação!");
                this.resume();
            }

            this.pontos = 0;
            this.nivel = 1;
            this.itens = [];
            this.inimigos = [];
            this.tiros = [];
            this.explosoes = [];
            this.gameOver = false;
 
            this.atualizaRankHtml();

            MarioVoador.reset();
            Fundo.reset();

        },
        leEntradas: function(fps) {
            var t = this.teclado;



            if (!this.telaDeInicio) {
                MarioVoador.sprite.setDirecao(Sprite.DIRECAO.PARADO);
                if (t.estaPressionada(t.teclas.SHIFT) && MarioVoador.estrelas > 0) {
                    t.desabilitaAteSoltar(t.teclas.SHIFT);
                    this.explodeTudo();
                }

                //se as duas estao pressionadas entao solta q que foi pressionada antes
                if (t.estaPressionada(t.teclas.ESQUERDA) && t.estaPressionada(t.teclas.DIREITA)) {
                    t.soltaTecla(t.getTeclaPressionadaQueFoiPressionadaAntes([
                        t.teclas.ESQUERDA, t.teclas.DIREITA
                    ]));
                }

                if (t.estaPressionada(t.teclas.ESPACO)) {
                    MarioVoador.atirar();
                }

                if (t.estaPressionada(t.teclas.DIREITA)) {
                    t.soltaTecla(t.teclas.ESQUERDA);
                    MarioVoador.sprite.setDirecao(Sprite.DIRECAO.DIREITA);
                    MarioVoador.sprite.aplicarMovimentoX(fps);
                    if (MarioVoador.comportamentos.paraDireita !== MarioVoador.sprite.comportamentoAtual) {
                        MarioVoador.sprite.setComportamentoAtual(MarioVoador.comportamentos.paraDireita);
                    }

                } else if (t.estaPressionada(t.teclas.ESQUERDA)) {
                    t.soltaTecla(t.teclas.DIREITA);
                    MarioVoador.sprite.setDirecao(Sprite.DIRECAO.ESQUERDA);
                    MarioVoador.sprite.aplicarMovimentoX(fps);
                    if (MarioVoador.comportamentos.paraEsquerda !== MarioVoador.sprite.comportamentoAtual) {
                        MarioVoador.sprite.setComportamentoAtual(MarioVoador.comportamentos.paraEsquerda);
                    }

                } else if (t.estaPressionada(t.teclas.CIMA)) {
                    t.soltaTecla(t.teclas.BAIXO);
                    MarioVoador.sprite.setDirecao(Sprite.DIRECAO.CIMA);
                    MarioVoador.sprite.aplicarMovimentoY(fps);
                    if (MarioVoador.comportamentos.paraCima !== MarioVoador.sprite.comportamentoAtual) {
                        MarioVoador.sprite.setComportamentoAtual(MarioVoador.comportamentos.paraCima);
                    }

                } else if (t.estaPressionada(t.teclas.BAIXO)) {
                    t.soltaTecla(t.teclas.CIMA);
                    MarioVoador.sprite.setDirecao(Sprite.DIRECAO.BAIXO);
                    MarioVoador.sprite.aplicarMovimentoY(fps);
                    if (MarioVoador.comportamentos.paraBaixo !== MarioVoador.sprite.comportamentoAtual) {
                        MarioVoador.sprite.setComportamentoAtual(MarioVoador.comportamentos.paraBaixo);
                    }
                }
                if (MarioVoador.sprite.direcao === Sprite.DIRECAO.PARADO &&
                        MarioVoador.comportamentos.parado !== MarioVoador.sprite.comportamentoAtual) {
                    MarioVoador.sprite.setComportamentoAtual(MarioVoador.comportamentos.parado);
                }

            } else {
                //tela de inicio
                if (t.estaPressionada(t.teclas.ENTER)) {
                    this.iniciarJogo();
                }
            }
        },
        aplicaEscala: function(escala) {
            if (escala <= 0.1) {
                return;
            }
            GLOBAIS.ESCALA = escala;
            this.canvas.width = GLOBAIS.LARGURA_CANVAS * GLOBAIS.ESCALA;
            this.canvas.height = GLOBAIS.ALTURA_CANVAS * GLOBAIS.ESCALA;

        },
        desenha: function(fps) {
            var i = 0, l;
            this.ctx.clearRect(0, 0, GLOBAIS.LARGURA_CANVAS * GLOBAIS.ESCALA, GLOBAIS.ALTURA_CANVAS * GLOBAIS.ESCALA);
            this.ctx.save();
            this.ctx.scale(GLOBAIS.ESCALA, GLOBAIS.ESCALA);

            Fundo.sprite.desenha(this.ctx);

            if (!this.telaDeInicio) {
                this.desenhaInterfaceStatus();

                MarioVoador.sprite.desenha(this.ctx);
                for (i = 0, l = MarioVoador.tiros.length; i < l; i++) {
                    MarioVoador.tiros[i].desenha(this.ctx);
                }

                for (i = 0, l = this.inimigos.length; i < l; i++) {
                    this.inimigos[i].sprite.desenha(this.ctx);
                }
                for (i = 0, l = this.explosoes.length; i < l; i++) {
                    this.explosoes[i].desenha(this.ctx);

                }
                for (i = 0, l = this.itens.length; i < l; i++) {
                    this.itens[i].sprite.desenha(this.ctx);
                }
            }
            this.ctx.restore();
        },
        passaNivel: function() {

            if (this.pontos >= 2000 && this.nivel === 1) {
                this.nivel = 2;
                Fundo.mudarFundo(this.nivel - 1);
            } else if (this.pontos >= 6000 && this.nivel === 2) {
                this.nivel = 3;
                Fundo.mudarFundo(this.nivel - 1);
            } else if (this.pontos >= 15000 && this.nivel === 3) {
                this.nivel = 4;
                Fundo.mudarFundo(this.nivel - 1);
            }

            //Fundo.mudarFundo(this.nivel - 1);
        },
        explodeTudo: function() {
            MarioVoador.estrelas--;
            var cont = 0;
            var totalInimigos = this.inimigos.length;
            while (cont < totalInimigos) {
                var inimigo = this.inimigos[cont];
                var x = inimigo.sprite.x;
                var y = inimigo.sprite.y;
                if (inimigo.sofreDano) {
                    this.pontos += 100 * inimigo.multiplicadorPontos;
                    this.explosoes.push(Explosao.getExplosao(x, y));
                    this.sorteiaItem(x, y);
                    this.inimigos.splice(cont, 1);
                    totalInimigos--;
                    continue;
                }
                cont++;
            }
            this.passaNivel();

        },
        sorteiaItem: function(x, y) {
            var randomico = Math.floor((Math.random() * 100) + 1);

            if (randomico > 95) {
                this.itens.push(Item.criaItemCogumelo(x, y));
            } else if (randomico > 85) {
                var randomicoItem = Math.floor((Math.random() * 100) + 1);

                if (randomicoItem <= 45) {
                    this.itens.push(Item.criaItemCogumeloVermelho(x, y));
                } else if (randomicoItem <= 90) {
                    this.itens.push(Item.criaItemFlorzinha(x, y));
                } else {
                    this.itens.push(Item.criaItemEstrela(x, y));
                }

            } else if (randomico > 80) {
                this.itens.push(Item.criaItemMoedaAzul(x, y));
            } else if (randomico > 50) {
                this.itens.push(Item.criaItemMoeda(x, y));
            }
        },
        colisoesTiros: function() {
            //verificar se o tiro colide
            var contTiro = 0, totalTiro = MarioVoador.tiros.length;
            while (contTiro < totalTiro) {
                var spriteTiro = MarioVoador.tiros[contTiro];
                var removeu = false;
                //colisao com inimigos
                var contInimigo = 0;
                var totalInimigo = this.inimigos.length;
                while (contInimigo < totalInimigo) {
                    var inimigo = this.inimigos[contInimigo];
                    var x = inimigo.sprite.x;
                    var y = inimigo.sprite.y;
                    if (spriteTiro.verificaColisaoComSprite(inimigo.sprite) && !inimigo.sprite.pisca.piscando) {
                        MarioVoador.tiros.splice(contTiro, 1);
                        totalTiro--;
                        removeu = true;
                        inimigo.aplicarDano();
                        if (inimigo.vidas < 0) {
                            this.inimigos.splice(contInimigo, 1);
                            totalInimigo--;
                            this.pontos += 100 * inimigo.multiplicadorPontos;
                            this.passaNivel();
                            this.explosoes.push(Explosao.getExplosao(x, y));
                            this.sorteiaItem(x, y);
                            continue;
                        }
                    }
                    contInimigo++;
                }
                if (removeu) {
                    continue;
                }
                //colisao com limites da tela  deve  remover o tiro
                if (spriteTiro.verificaSeUltrapassouLimitesDoCanvas({
                    direita: true
                })) {
                    MarioVoador.tiros.splice(contTiro, 1);
                    totalTiro--;
                    continue;
                }
                contTiro++;

            }
        },
        colisoesInimigo: function() {


            var i = 0;
            var totalInimigos = this.inimigos.length;
            while (i < totalInimigos) {
                if (this.inimigos[i].tipo === "InimigoTartarugaAzul")
                {
                    var altura = this.inimigos[i].sprite.comportamentoAtual.frames[this.inimigos[i].sprite.comportamentoAtual.indiceFrameAtual].altura;
                    var objColisao = this.inimigos[i].sprite.verificaSeColidiuLimitesDoCanvas();
                    if (objColisao.baixo || objColisao.topo) {
                        if (objColisao.topo) {
                            this.inimigos[i].sprite.y = 0;
                        }
                        if (objColisao.baixo) {
                            this.inimigos[i].sprite.y = GLOBAIS.ALTURA_CANVAS - altura;
                        }
                        this.inimigos[i].setDirecaoCimaBaixoDiagonal(Date.now());
                    }
                }
                if (this.inimigos[i].sprite.verificaSeUltrapassouLimitesDoCanvas({baixo: true, esquerda: true})) {
                    this.inimigos.splice(i, 1);
                    totalInimigos--;
                    continue;
                }
                i++;
            }


        },
        colisoesMario: function() {
            var frameAtual = MarioVoador.sprite.comportamentoAtual.frames[MarioVoador.sprite.comportamentoAtual.indiceFrameAtual];
            var largura = frameAtual.largura;
            var altura = frameAtual.altura;
            // if (MarioVoador.sprite.verificaSeUltrapassouLimitesDoCanvas({baixo: true, esquerda: true, topo: true, direita: true})) {
            // console.log(2)

            // }
            //====colisao com limites do canvas ===============================
            var objColisao = MarioVoador.sprite.verificaSeColidiuLimitesDoCanvas();
            if (objColisao.topo) {
                MarioVoador.sprite.y = 0;
                // console.log("top")
            }
            if (objColisao.direita) {
                MarioVoador.sprite.x = GLOBAIS.LARGURA_CANVAS - largura;
                // console.log("dire")
            }
            if (objColisao.baixo) {
                MarioVoador.sprite.y = GLOBAIS.ALTURA_CANVAS - altura;
                //console.log("baixo")
            }
            if (objColisao.esquerda) {
                MarioVoador.sprite.x = 0;
                // console.log("esqr")
            }
            //======================================================================
            //==colisao com inimigos
            for (var i = 0, l = this.inimigos.length; i < l; i++) {
                if (MarioVoador.sprite.verificaColisaoComSprite(this.inimigos[i].sprite)
                        && !MarioVoador.sprite.pisca.piscando) {
                    //debugger;
                    MarioVoador.aplicarDano();

                    if (MarioVoador.quantidadeTiro > 1) {
                        MarioVoador.quantidadeTiro--;
                    }

                    if (MarioVoador.tipoTiro > 1) {
                        MarioVoador.tipoTiro--;
                    }

                    if (MarioVoador.vidas < 0) {
                        this.gameOver = true;
                        Fundo.sons[this.nivel - 1].pause();
                    }

                }
            }
            //=======================================================================
            //==colisao com itens
            var contItens = 0;
            var totalItens = this.itens.length;
            while (contItens < totalItens) {
                if (MarioVoador.sprite.verificaColisaoComSprite(this.itens[contItens].sprite)) {
                    this.pontos += this.itens[contItens].pontos;
                    if (this.itens[contItens].tipo === "ItemCogumelo") {
                        MarioVoador.vidas++;
                    } else if (this.itens[contItens].tipo === "ItemCogumeloVermelho") {
                        if (MarioVoador.quantidadeTiro < 3) {
                            MarioVoador.quantidadeTiro++;
                        }
                    } else if (this.itens[contItens].tipo === "ItemFlorzinha") {
                        if (MarioVoador.tipoTiro < 3) {
                            MarioVoador.tipoTiro++;
                        }
                    } else if (this.itens[contItens].tipo === "ItemEstrela") {
                        MarioVoador.estrelas++;
                    }
                    this.itens[contItens].sons.pegar.play();
                    this.itens.splice(contItens, 1);
                    totalItens--;
                    continue;
                }
                contItens++;
            }

        },
        colisoes: function(fps) { // MarioVoador.sprite.y = 200 ;return;
            // var MarioVoadorFrameAtual = MarioVoador.sprite.comportamentoAtual.frames[MarioVoador.sprite.comportamentoAtual.indiceFrameAtual];
            this.colisoesTiros();
            this.colisoesInimigo();
            this.colisoesMario();

        },
        atualizaComportamentoExplosao: function(fps) {
            var contExplosao = 0;
            var totalExplosao = this.explosoes.length;
            while (contExplosao < totalExplosao) {
                this.explosoes[contExplosao].executar(fps);
                if (this.explosoes[contExplosao].comportamentoAtual.animacaoFinalizada) {
                    this.explosoes.splice(contExplosao, 1);
                    totalExplosao--;
                    continue;
                }
                contExplosao++;
            }
        },
        atualizaComportamentoInimigo: function(fps) {
            for (var i = 0, l = this.inimigos.length; i < l; i++) {
                this.inimigos[i].atualizaComportamento(fps);
            }
        },
        atualizaComportamentoItem: function(fps) {
            for (var i = 0, l = this.itens.length; i < l; i++) {
                this.itens[i].executar(fps);
            }
        },
        atualizaComportamentoTiro: function(fps) {
            for (var i = 0, l = MarioVoador.tiros.length; i < l; i++) {
                MarioVoador.tiros[i].executar(fps);
                MarioVoador.tiros[i].aplicarMovimentoX(fps);
            }

        },
        atualizaComportamentos: function(fps) {
            Fundo.atualiza(fps);
            if (!this.telaDeInicio) {
                MarioVoador.sprite.executar(fps);
                this.atualizaComportamentoTiro(fps);
                this.atualizaComportamentoInimigo(fps);
                this.atualizaComportamentoExplosao(fps);
                this.atualizaComportamentoItem(fps);

                if (MarioVoador.sprite.comportamentoAtual === MarioVoador.comportamentos.morrendo &&
                        MarioVoador.sprite.verificaSeUltrapassouLimitesDoCanvas({baixo: true}) &&
                        MarioVoador.sprite.comportamentoAtual.animacaoFinalizada) {
                    this.reset();
                }
            }

        },
        calculaFPS: function(tempoDecorridoDesdeUltimoLoop) {
            // estimativa  aproximada:
            // se estiver executando a cada loop o tempo de 'tempoDecorridoDesdeUltimoLoop'
            // então  ele executara 1000/tempoDecorridoDesdeUltimoLoop vezes em um segundo   
            // Por exemplo:
            // se a cada loop  demora 16ms então em 1 segundo (1000ms) ele  executara 60 vezes           
            // x =  1000/16  //quantas  vezes durante um segundo  executando cada loop a 16ms
            // x  = 60 fps
            if (tempoDecorridoDesdeUltimoLoop > 0) {
                this.fps = (1000 / tempoDecorridoDesdeUltimoLoop);

            }

            return this.fps;

        },
        pausado: false,
        tempoNoPause: 0,
        pause: function() {
            if (this.pausado) {
                return;
            }
            this.tempoNoPause = Date.now();
            this.pausado = true;
            ElementoAudio.pauseTodos();
        },
        resume: function() {
            if (!this.pausado) {
                return;
            }
            this.pausado = false;
            this.ultimoLoop = Date.now();
            ElementoAudio.playTodosQueEstavamTocando();

        },
        loop: function() {
            var that = this;
            if (!this.pausado) {

                var tempoAgora = Date.now();
                var tempoDecorrido = tempoAgora - this.ultimoLoop;
                this.ultimoLoop = tempoAgora;
                var fps = this.calculaFPS(tempoDecorrido);

                if (!this.gameOver) {
                    this.leEntradas(fps);

                }
                if (!this.telaDeInicio) {
                    this.adicionaInimigo();

                }
                //executar comportamento
                this.atualizaComportamentos(fps);

                if (!this.gameOver && !this.telaDeInicio) {
                    this.colisoes(fps);
                }


                //desenhar as entidades
                this.desenha(fps);

            }

            window.requestAnimationFrame(function() {
                that.loop();
            });
        },
        tempoQuedesenhouFPS: 0,
        ultimoFPSDesenhado: 0,
        desenhaFPS: function() {
            var fps = this.ultimoFPSDesenhado;
            var agora = Date.now();
            if (agora - this.tempoQuedesenhouFPS > 100) {
                this.tempoQuedesenhouFPS = agora;
                this.ultimoFPSDesenhado = this.fps;

            }

            this.ctx.save();

            //this.ctx.scale(GLOBAIS.ESCALA, GLOBAIS.ESCALA);
            var string = "   FPS:" + this.ultimoFPSDesenhado.toFixed(1);

            this.ctx.fillStyle = "#000000";
            this.ctx.textBaseline = "top";
            var fonte = 9;

            this.ctx.font = fonte + "px Arial";
            this.ctx.fillText(string, GLOBAIS.LARGURA_CANVAS - (fonte * 6), GLOBAIS.ALTURA_CANVAS - (fonte * 2));

            this.ctx.restore();
        },
        desenhaInterfaceStatus: function() {
            this.ctx.save();
            this.ctx.globalAlpha = 0.9;
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.fillRect(0, 0, GLOBAIS.LARGURA_CANVAS, 23);


            var objImg = carregadorRecursos.get("recursos/img/itens.png");

            for (var i = 0; i <= MarioVoador.estrelas; i++)
            {
                this.ctx.drawImage(objImg, 274, 13,
                        15, 16,
                        (GLOBAIS.LARGURA_CANVAS - (20 * i)), 3,
                        15, 16);
            }

            //vidas
            var solzinho = MarioVoador.vidas;

            if (solzinho < 0) {
                solzinho = 0;
            }

            var string = "Vidas: " + solzinho + "   Pontos: " + this.pontos + "   Nivel: " + this.nivel;

            this.ctx.fillStyle = "#000000";
            this.ctx.textBaseline = "top";
            var fonte = 9;

            this.ctx.font = fonte + "px Arial";
            this.ctx.fillText(string, 10, 10);
            this.ctx.restore();
            this.desenhaFPS();
        },
        atualizaRankHtml: function() {
            if (localStorage.getItem("rank") === null) {
                document.querySelector("#maiorPontuacao").innerHTML = "0";
            } else {
                document.querySelector("#maiorPontuacao").innerHTML = localStorage.getItem("rank");
            }
        },
        init: function(teclado) {

            this.teclado = teclado;
            this.recursos = carregadorRecursos;
            this.ElementoAudio = ElementoAudio;


            this.canvas = document.querySelector("#canvasDoJogo");

            this.ctx = this.canvas.getContext("2d");
            this.aplicaEscala(GLOBAIS.ESCALA);


            //criar as entidade //personagens
            this.inicializarEntidades();

            this.ultimoLoop = Date.now();
            this.loop();
        }

    };
})(MarioVoador, Sprite, Explosao, GLOBAIS, Inimigo, Fundo, carregadorRecursos, Item, ElementoAudio);
