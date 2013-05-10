/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */
(function(Jogo, carregadorRecursos, Teclado) {
    "use strict";
    window.addEventListener("DOMContentLoaded", function() {

        carregadorRecursos.carregar({
            forcarCarregamento: true,
            imagens: [
                "recursos/img/fundo.png",
                "recursos/img/mario-MarioVoador.png",
                "recursos/img/inimigos.png",
                "recursos/img/explosao.png",
                "recursos/img/itens.png"
            ],
            audio: [
                "recursos/audio/snd/dano",
                "recursos/audio/snd/tiro",
                "recursos/audio/snd/tiroCanhao",
                "recursos/audio/snd/explode",
                "recursos/audio/snd/pegaMoeda",
                "recursos/audio/snd/morrendo",
                "recursos/audio/snd/danoNoInimigo",
                "recursos/audio/snd/vida",
                "recursos/audio/snd/cogumelo",
                "recursos/audio/musica/1",
                "recursos/audio/musica/2",
                "recursos/audio/musica/3",
                "recursos/audio/musica/4"
            ]

        }, {
            onAoCarregarUmRecurso: function(percCompleto, srcItemRecurso, carregouComSucesso) {
                document.querySelector("#carregando").style.width = percCompleto + "%";
                document.querySelector("#carregando").innerHTML = "recursos carregados: " + percCompleto +
                        "% - atual: " + srcItemRecurso + " , sucesso: " + ((carregouComSucesso) ? "SIM" : "NAO");
                console.log(document.querySelector("#carregando").innerHTML);
            },
            onCarregouTodos: function(tempoTotalParaCarregar, carregouTodosComSucesso) {
                document.querySelector("#carregando").style.display = "none";
                console.log("CARREGOU TODOS RECURSOS em " + tempoTotalParaCarregar + "ms   SITUACAO:" + ((carregouTodosComSucesso) ? "SUCESSO" : "ERRO"));
                document.querySelector("#btnEscala").addEventListener("change", function() {
                    if (isNaN(parseFloat(this.value))) {
                        return;
                    }
                    document.querySelector("#escalaTexto").innerHTML = parseFloat(this.value);
                    Jogo.aplicaEscala(parseFloat(this.value));
                }, false);


                Jogo.init(new Teclado());
            }
        });
    });
})(Jogo, carregadorRecursos, Teclado);