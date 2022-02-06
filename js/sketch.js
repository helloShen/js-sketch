/* create grids in canvas */
const initCanvas = function() {
    const canvas = document.querySelector('.canvas');
    const background = document.querySelector('.background');
    /* clear old canvas if any */
    canvas.innerHTML = '';
    background.innerHTML = '';
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
    background.style['grid-template-columns'] = `repeat(${column}, 1fr)`;
    background.style['grid-template-rows'] = `repeat(${row}, 1fr)`;
    for (let i = 0; i < (row * column); i++) {
        canvas.appendChild(canvasCell());
        background.appendChild(backgroundCell(i, column));
    }
};

/* overlay canvas cells, transparent by default */
const canvasCell = function() {
    let cell = document.createElement('div');
    cell.classList.add('canvas-cell');
    cell.style['background-color'] = '#FFFFFF';
    cell.style['z-index'] = 1;
    cell.style.opacity = 0;
    cell.draggable = false; 
    cell.addEventListener('mousedown', draw, false);
    cell.addEventListener('mouseenter', draw, false); // mouseenter is better than mouseover
    return cell;
};

/* background cells */
const backgroundCell = function(idx, column) {
    let cell = document.createElement('div');
    cell.classList.add('background-cell');
    cell.style['z-index'] = -1;
    const floor = Math.floor((idx / column));
    if (floor % 2 === 0) {
        if (idx % 2 === 0) {
            cell.style['background-color'] = '#EBEBEB';
        } else {
            cell.style['background-color'] = '#FFFFFF';
        }
    } else {
        if (idx % 2 === 0) {
            cell.style['background-color'] = '#FFFFFF';
        } else {
            cell.style['background-color'] = '#EBEBEB';
        }
    }
    cell.draggable = false;
    return cell;
};

const initCanvasConstructor = function() {
    /* row & column setting area */
    const row = document.querySelector('.canvasRow');
    const column = document.querySelector('.canvasColumn');
    row.innerHTML = '16';
    column.innerHTML = '16';
    /* canvas initializer */
    const initCanvasBtn = document.querySelector('.initCanvas');
    initCanvasBtn.addEventListener('click', initCanvas);
    /* binding event listeners to canvas */
    const canvas = document.querySelector('.canvas');
    canvas.draggable = false;
    canvas.addEventListener('mousedown', toDraw, true); // capture must be true. canvas must turn on "isDrawing" before cell capture the mousedown event.
    document.addEventListener('mouseup', stopDrawing, true); // document element handle this. no need to notify children.
}

/* create backgroundSwitch div */
const initBackgroundSwitch = function() {
    const bs = document.querySelector('.backgroundSwitch');
    bs.dataset.state = 'on'; // default: have the background layer
    bs.classList.add('on');
    bs.addEventListener('click', switchBackground, false);
}

/* click event handler for backgroundSwitch div */
const switchBackground = function(e) {
    const bs = e.target;
    if (bs.dataset.state.localeCompare('on') === 0) {
        bs.dataset.state = 'off';
        bs.classList.remove('on');
        const background = document.querySelector('.background');
        background.style.opacity = 0;
    } else {
        bs.dataset.state = 'on';
        bs.classList.add('on');
        const background = document.querySelector('.background');
        background.style.opacity = 1;
    }
}

const initRubber = function() {
    const rubber = document.querySelector('.rubber');
    rubber.addEventListener('click', () => mode = 0, false);
}

/* color pelettes */
const colors = ['#000000', '#00A5E3', '#8DD7Bf', '#FF96C5', '#FF5768', '#FFBF65'];
const initColorPalette = function() {
    const palette = document.querySelector('.colors');
    for (let i = 0; i < colors.length; i++) {
        let color = document.createElement('div');
        color.classList.add('color');
        color.style['background-color'] = colors[i];
        color.addEventListener('click', () => { 
            mode = 1;
            currentColor = color.style['background-color']
        }, false);
        palette.appendChild(color);
    }
};

/* mousedown event handler on canvas */
const toDraw = function(e) {
    e.preventDefault(); // !IMPORTANT: inhibit some browser's default drag & drop behaviors
    isDrawing = true;
};

/* mouseenter event handler on each cell */
const draw = function(e) {
    e.preventDefault(); // !IMPORTANT: inhibit some browser's default drag & drop behaviors
    if (isDrawing) {
        if (mode === 1) {
            this.style['background-color'] = currentColor;
            this.style.opacity = 1;
        } else {
            this.style['background-color'] = '#FFFFFF';
            this.style.opacity = 0;
        }
    }
};

/* mouseup event handler on whole document */
const stopDrawing = function(e) {
    isDrawing = false;
    e.stopPropagation();
};

/* initialize the whole page */
const init = function() {
    initCanvasConstructor();
    initCanvas();
    initBackgroundSwitch();
    initRubber();
    initColorPalette();
}

/* variables */
let mode = 1; // 0: rubber, 1: pencil
let currentColor = 'black';
let isDrawing = false;

init();



