
var exemploTileMap = {
	ctx : null,
	canvas : null,
	matCenario : [
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
		[-1, -1, -1, -1, -1, 9, 10, 11, -1, -1],
		[-1, -1, -1, -1, -1, 12, 13, 14, -1, -1],
		[-1, -1, -1, -1, -1, 12, 13, 14, -1, -1],
		[-1, -1, -1, -1, -1, 12, 13, 14, -1, -1],
		[10, 10, 10, 10, 10, 10, 10, 10, 10, 10]

	],

	desenhaCenario : function (img) {
		var larguraCelula = 68;
		var alturaCelula = 68;
		var larguraTile = img.width;
		var alturaTile = img.height;
		var espacamento = 4;
		this.canvas.width = (this.matCenario[0].length * (larguraCelula - espacamento));
		this.canvas.height = (this.matCenario.length * (alturaCelula - espacamento));
		var quantidadeDeCelulaEmCadaLinha = Math.floor(larguraTile / larguraCelula);
		this.ctx.save();
		for (var linha = 0; linha < this.matCenario.length; linha++) {
			for (var coluna = 0; coluna < this.matCenario[linha].length; coluna++) {
				var idCelula = this.matCenario[linha][coluna];
				if (idCelula === -1) {
					continue;
				}
				var xImg = (idCelula % quantidadeDeCelulaEmCadaLinha) * larguraCelula;
				var yImg = Math.floor(idCelula / quantidadeDeCelulaEmCadaLinha) * alturaCelula;
				this.ctx.drawImage(img, xImg + espacamento, yImg + espacamento,
					larguraCelula - espacamento, alturaCelula - espacamento,
					coluna * (larguraCelula - espacamento), linha * (alturaCelula - espacamento),
					larguraCelula - espacamento, alturaCelula - espacamento);
			}
		}
		this.ctx.restore();
	},

	init : function () {
		var that = this;
		this.canvas = document.querySelector("#elementoCanvas");
		this.ctx = this.canvas.getContext("2d");
		var img = new Image();
		img.src = "img/tilemap.png";
		img.onload = function () {
			that.desenhaCenario(img);
		};

	}

};
