let canvas, ctx, w, h, particles = [];
let mouse = {
    x: undefined,
    y: undefined,
}
const particleCount = 15;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    resizeReset();
    animationLoop();
}

function resizeReset() {

    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, w, h);
}
function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;
}
function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}
function animationLoop() {
    if (particles.length < particleCount) {
        particles.push(new Particle())
    }

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'rgba(0,0,0,0.05)'
    ctx.fillRect(0, 0, w, h)


    ctx.globalCompositeOperation = 'lighter'
    drawScene();

    requestAnimationFrame(animationLoop)
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min
}
function getAngle(x1, y1, x2, y2) {
    // SLOPE Calculate and the relation between slop and degree
    // m = (y2-y1)/(x2-x1) |  tan(𝜃)=𝑚 => 𝜃=tan−1(𝑚) with tan-1 equal to atan2
    let rad = Math.atan2(x2 - x1, y2 - y1);
    return (rad * 180) / Math.PI
}

function drawScene() {
    particles.map((p) => {
        p.update();
        p.draw();
    })
}

function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.angle = Math.random() * 360;
    this.pangle = this.angle;

    this.speed = 8;
    this.blur = 5;
    this.style = "hsla(40, 100%, 50%, 1)"


    this.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.px, this.py);
        ctx.lineTo(this.x, this.y);
        ctx.lineWidth = 3;
        ctx.shadowBlur = this.blur;
        ctx.shadowColor = this.style;
        ctx.strokeStyle = this.style;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        // drawText()

    }

    this.update = function () {
        this.px = this.x;
        this.py = this.y;
        if (mouse.x !== undefined) {
            this.angle = getAngle(this.x, this.y, mouse.x, mouse.y)
        } else {
            this.angle += getRandomInt(-10, 10);
        }
        this.radian = (Math.PI / 180) * this.angle;

        // Sin doi/huyen - cos ke/huyen
        // Math.sin = ti le canh doi' / huyen = ti le x toi mouse pointer / khoang cach 2 diem
        this.x += this.speed * Math.sin(this.radian);
        this.y += this.speed * Math.cos(this.radian);


        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
            this.angle += 90;
        }
    }
}
function drawText() {
    // with this mode
    // every previous pixel that is not under the next drawing
    // will get cleared
    ctx.globalCompositeOperation = "destination-atop"

    ctx.font = "bold 250px 'Sans-serif'";
    ctx.fillStyle = "black";
    ctx.fillText("Patrick Le", 250, h / 2 + 125);

    // reset to default mode
    ctx.globalCompositeOperation = "source-over"
}
window.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', resizeReset)
window.addEventListener('mousemove', mousemove);
window.addEventListener('mouseout', mouseout);
