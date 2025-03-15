// Make a draw app / exercise
const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');
const cursor = document.querySelector('i#cursor')

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

let canvasSnapshot;

let style = 'brush' // brush/rectangle

let listSnapshot = [];
let currentSnapshotIndex = -1;
let color = '#ffffff'

// undo index-1
// redo index+1
// draw index+1

// clear

function save() {
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
    listSnapshot.push(snap);
}
function undo() {
    currentSnapshotIndex = currentSnapshotIndex - 1;
    if (currentSnapshotIndex >= 0) {
        ctx.putImageData(listSnapshot[currentSnapshotIndex], 0, 0)
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
}
function redo() {
    console.log(currentSnapshotIndex);
    if (currentSnapshotIndex + 1 === listSnapshot.length) {
        return
    }
    currentSnapshotIndex = currentSnapshotIndex + 1;
    ctx.putImageData(listSnapshot[currentSnapshotIndex], 0, 0)
}
toolbar.addEventListener('click', e => {
    document.querySelector('i#cursor').classList.remove('show')
    document.querySelector('div.drawing-board').classList.remove('cursor-cross')

    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // can't undo when clear
        listSnapshot = [];
        currentSnapshotIndex = 0;
    }

    if (e.target.id === 'brush') {
        style = 'brush'
    }
    if (e.target.id === 'rectangle') {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.querySelector('div.drawing-board').classList.add('cursor-cross')
        style = 'rectangle'
    }

    if (e.target.id === 'undo') {
        undo()
    }


    if (e.target.id === 'redo') {
        redo()
    }

    if (e.target.id == 'eraser') {
        style = 'eraser';
        document.querySelector('i#cursor').classList.add('show')
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        color = e.target.value;
        ctx.strokeStyle = color;
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }

});

// 17:05 | 21:05

const draw = (e) => {
    // move the cursor
    cursor.style.left = e.clientX;
    cursor.style.top = e.clientY;




    if (!isPainting) {
        return;
    }
    // clear from current 
    listSnapshot = listSnapshot.slice(0, currentSnapshotIndex + 1);


    ctx.lineWidth = lineWidth;
    if (style === 'eraser') {
        ctx.lineCap = 'square';
        ctx.strokeStyle = 'white'
        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
        ctx.stroke();
        ctx.strokeStyle = color

    }


    if (style === 'brush') {
        ctx.lineCap = 'round';
        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
        ctx.stroke();
    }
    if (style === 'rectangle') {

        ctx.lineCap = 'square';

        const width = e.clientX - canvasOffsetX - startX
        const height = e.clientY - canvasOffsetY - startY


        ctx.putImageData(canvasSnapshot, 0, 0)
        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        ctx.stroke();



    }
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;

    canvasSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    save();
    currentSnapshotIndex++;
});

window.addEventListener('keydown', e => {
    // check is user hold the ctrl/cmd button
    const isCmd = e.metaKey || e.ctrlKey;

    // cmd+z = undo
    // cmd+shift+z = redo
    // cmd+y = redo
    if (isCmd && e.key === 'z') {
        e.preventDefault();

        if (e.shiftKey) {
            redo();
        } else {
            undo()
        }
    }

    if (isCmd && e.key === 'y') {
        e.preventDefault();

        redo()
    }
})


canvas.addEventListener('mousemove', draw);


