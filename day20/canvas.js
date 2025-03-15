// Refer: https://www.w3schools.com/graphics/canvas_reference.asp
// See more:
// + Canvas Clock: https://www.w3schools.com/graphics/canvas_clock.asp
// + HTML Game: https://www.w3schools.com/graphics/game_intro.asp

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
drawAxis();
drawGrid();
ctx.strokeStyle = 'red';
ctx.lineWidth = 10




// START END
// ctx.beginPath();
// ctx.moveTo(300, 100);
// ctx.lineTo(400, 200);
// ctx.lineTo(500, 100);
// ctx.lineTo(450, 50);
// ctx.fill();
// ctx.stroke();


// ctx.beginPath();
// ctx.strokeStyle = "blue";
// ctx.fillStyle = 'blue'
// ctx.rect(600, 400, 200, 100);
// ctx.stroke();
// ctx.fill();

// degree    progress

// 180  50
// 360 100

let progress = 0 // increase to 360

const a = setInterval(function () {
    if (progress >= 100) {
        clearInterval(a)
    }
    ctx.clearRect(100, 200, 200, 200)
    ctx.beginPath();
    const degree = 360 * progress / 100
    console.log(degree)
    ctx.arc(200, 300, 100, ((270 * Math.PI) / 180), (((degree + 270) * Math.PI) / 180));
    ctx.stroke();

    ctx.beginPath()
    ctx.fillText(`${progress}%`, 200, 300);
    progress = progress + 1
    ctx.closePath()

}, 50
)



// ctx.clearRect(550, 450, 100, 100);


// END

// Create an Animation to draw a circle with canvas 
// 16:55 | 20:55


function drawAxis() {
    ctx.font = "12px Comic Sans MS";
    ctx.fillStyle = "green";

    for (var x = 100; x <= canvas.width; x += 100) {
        ctx.fillText(x, x, 10);
    }
    for (var y = 100; y <= canvas.height; y += 100) {
        ctx.fillText(y, 0, y);
    }
}
function drawGrid() {
    ctx.strokeStyle = "#ccc";
    ctx.beginPath();
    for (var x = 100; x <= canvas.width; x += 100) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (var y = 100; y <= canvas.height; y += 100) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
}

// 