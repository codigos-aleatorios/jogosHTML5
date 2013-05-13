var exemploEspelha = {
	ctx: null,
	canvas: null,
	espelha: function (img) {
		var larguraImg = img.width;
		var alturaImg = img.height;

		var frame = {
			x: 107,
			y: 2,
			largura: 65,
			altura: 106
		};
		var posicaoX = 300;
		var posicaoY = 70;
		this.ctx.save();
		//-------------------------------------------
		//aqui eh onde espelhamos
		this.ctx.translate(frame.largura + (posicaoX * 2), 0);
		this.ctx.scale(-1, 1);
		//-------------------------------------------
		//desenha  normalmente
		this.ctx.drawImage(img, frame.x, frame.y,
			frame.largura, frame.altura,
			posicaoX, posicaoY,
			frame.largura, frame.altura);

		this.ctx.restore();
	},

	init: function () {
		var that = this;
		this.canvas = document.querySelector("#elementoCanvas");
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = 990;
		this.canvas.height = 200;
		var img = new Image();
		img.src = "img/sprite1.jpg";
		img.onload = function () {
			that.espelha(img);
		};

	}

};