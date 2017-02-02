var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

ctx.scale(1, -1);
ctx.translate(width / 2, -height / 2);
ctx.fillStyle = '#FFF';

// Börja på {0, 0}, sluta på {1, 0}
// var arr = [[0, 0], [0.5, 0.5], [1, 0]];
// var arr = [[0, 0], [0.5, -0.5], [0.5, 0.5], [1, 0]];
// var arr = [[0, 0], [0, 0.5], [1, 0]];
var arr = [[0, 0], [1, 1], [1.5, 0.5], [1, 0]];

function draw(iters, x, y, tx, ty) {
	var length = Math.sqrt((x-tx)*(x-tx) + (y-ty)*(y-ty));
	var angle = Math.atan2(ty - y, tx - x);
	var lastX = x, lastY = y;

	ctx.beginPath();
	ctx.moveTo(x, y);

	for (var i = 1; i < arr.length; i++) {
		var xx = x + arr[i][0]*length*Math.cos(angle)
				- arr[i][1]*length*Math.sin(angle);
		var yy = y + (arr[i][0]*length*Math.sin(angle)
				+ arr[i][1]*length*Math.cos(angle));

		if (iters <= 1)
			ctx.lineTo(xx, yy);
		else
			draw(iters - 1, lastX, lastY, xx, yy);

		lastX = xx;
		lastY = yy;
	}
	ctx.stroke();
}

// draw(1, -100, -50, 100, -50);

function render() {
	ctx.beginPath();
	ctx.fillRect(-width, -height, 2*width, 2*height);
	ctx.beginPath();
	draw(document.getElementById('num').value, -10, -50, 10, -50);
}

render();

