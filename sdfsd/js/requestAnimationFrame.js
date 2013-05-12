window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(function() {
                    callback(+new Date);
                }, 1000 / 60);
            };
})();