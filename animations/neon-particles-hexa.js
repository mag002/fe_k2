let canvas, ctx, w, h;
let units, hue = 0, unitCounts = 20;
let mouse = {
    x: undefined,
    y: undefined,
}
function mousemove(e) {
    mouse.x = e.x;
    mouse.y = e.y;
}
function mouseout() {
    mouse.x = undefined;
    mouse.y = undefined;
}
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    resizeReset();
    creatUnits();
    animationLoop();
}

function creatUnits() {
    units = [];
    for (let i = 0; i < unitCounts; i++) {
        setTimeout(() => {
            units.push(new Unit())

        }, i * 200)
    }
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
    let rad = Math.atan2(x2 - x1, y2 - y1);
    return (rad * 180) / Math.PI
}

function drawScene() {
    units.forEach((u) => {
        u.update();
        u.draw();
    })
}

function Unit() {
    this.reset = function () {
        if (mouse && mouse.x) {
            this.x = mouse.x;
            this.y = mouse.y;
        } else {

            this.x = Math.round(w / 2);
            this.y = Math.round(h / 2);
        }
        this.sx = this.x;
        this.sy = this.y
        this.speed = 4;
        this.size = 2.5;
        this.angle = 60 * getRandomInt(0, 5)
        this.radian = (Math.PI / 180) * (this.angle + 90)
        this.maxDistance = 60;
        this.time = 0;
        this.ttl = getRandomInt(100, 200);
        this.hue = hue;
        hue += 10;
    }
    this.reset();
    this.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue},100%,50%)`;
        ctx.shadowColor = `hsl(${this.hue},100%,50%)`;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.closePath();
        ctx.restore();

    }

    this.update = function () {
        let dx = this.sx - this.x;
        let dy = this.sy - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance >= this.maxDistance) {
            if (getRandomInt(0, 1)) {
                this.angle += 60;
            } else {
                this.angle -= 60
            }
            this.radian = (Math.PI / 180) * (this.angle + 90);
            this.sx = this.x;
            this.sy = this.y;
        }
        this.x += this.speed * Math.sin(this.radian);
        this.y += this.speed * Math.cos(this.radian);

        if (this.time > this.ttl || this.x < 0 || this.x > w || this.y > h || this.y < 0) {
            this.reset()
        }

        this.time++
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
