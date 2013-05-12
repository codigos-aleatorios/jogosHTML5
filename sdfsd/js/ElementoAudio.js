/**
 *  Heberth Jorge Feres / @fereshj  
 *  Victor Hugo de Paiva Goncales / @victorvhpg  
 */
////OBS: a validacao de suporte ja esta no carregadorRecursos.js
//logo so use audio de ja  foi carregado no  carregadorRecursos
var ElementoAudio = (function() {
    "use strict";
    var _vetAudio = [];
    var _vetEstaTocando = [];


    var ElementoAudio = function(config) {
        var audio = document.createElement("audio");
        audio.src = config.elementoAudio.src;
        audio.loop = config.loop || false;
        _vetAudio.push(audio);
        return audio;
    };

    ElementoAudio.pauseTodos = function() {
        _vetEstaTocando = [];
        for (var i = 0; i < _vetAudio.length; i++) {
            //esta tocando  e ainda nao chegou no final
            if (!_vetAudio[i].paused && _vetAudio[i].currentTime > 0 &&
                    _vetAudio[i].currentTime < _vetAudio[i].duration) {
                ////_vetAudio[i].volume = 0;
                // console.log( _vetAudio[i].src + _vetAudio[i].currentTime);
                _vetAudio[i].pause();
                _vetEstaTocando.push(_vetAudio[i]);
            }
        }
    };
    ElementoAudio.playTodosQueEstavamTocando = function() {
        for (var i = 0; i < _vetEstaTocando.length; i++) {
            _vetEstaTocando[i].play();
        }
        _vetEstaTocando = [];
    };

    ElementoAudio.volume = function(volume) {

        for (var i = 0; i < _vetAudio.length; i++) {


            _vetAudio[i].volume = volume / 100;


        }
    };
    return ElementoAudio;
})();


