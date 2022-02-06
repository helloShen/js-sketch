/* create grids in canvas */
const initCanvas = function() {
    const canvas = document.querySelector('.canvas');
    /* clear old canvas if any */
    canvas.innerHTML = '';
    /* create new canvas */
    let row = parseInt(document.querySelector('textarea.canvasRow').value);
    let column = parseInt(document.querySelector('textarea.canvasColumn').value);
    if (!row || !column) return;
    if (row <= 0) {
        row = 16;
    } else if (row > 100) {
        row = 100;
    }
    if (column <= 0) {
        column = 16;
    } else if (column > 100) {
        column = 100;
    }
    canvas.style['grid-template-columns'] = `repeat(${column}, 1fr)`;
    canvas.style['grid-template-rows'] = `repeat(${row}, 1fr)`;
    for (let i = 0; i < (row * column); i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.draggable = false; // default value is already false
        cell.addEventListener('mousedown', draw, false);
        cell.addEventListener('mouseenter', draw, false); // mouseenter is better than mouseover
        cell.addEventListener('dragstart', () => {}, false);
        canvas.appendChild(cell);
    }
}

/* mousedown event handler on canvas */
const toDraw = function(e) {
    e.preventDefault(); // !IMPORTANT: inhibit some browser's default drag & drop behaviors
    isDrawing = true;
}

/* mouseenter event handler on each cell */
const draw = function(e) {
    e.preventDefault(); // !IMPORTANT: inhibit some browser's default drag & drop behaviors
    if (isDrawing) {
        this.style['background-color'] = color;
    }
}

/* mouseup event handler on whole document */
const stopDrawing = function(e) {
    isDrawing = false;
    e.stopPropagation();
}





/* variables */
let color = 'black';
let isDrawing = false;
/* canvas init */
const initCanvasBtn = document.querySelector('.initCanvas');
initCanvasBtn.addEventListener('click', initCanvas);
/* draw */
const canvas = document.querySelector('.canvas');
canvas.draggable = false;
canvas.addEventListener('mousedown', toDraw, true); // capture must be true. canvas must turn on "isDrawing" before cell capture the mousedown event.
document.addEventListener('mouseup', stopDrawing, true); // document element handle this. no need to notify children.


