const canvas = document.querySelector('#jsCanvas')
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const saveBtn = document.getElementById('jsSave')
const infocolor = document.querySelector('.controls__infocolor')
const inforange = document.querySelector('.controls__inforange')

console.log(infocolor.textContent, inforange.textContent);

const logger = (event) => {
    event.target.textContent = 'changed'
}

infocolor.addEventListener('click', logger)
inforange.addEventListener('click', logger)


let painting = false
let filling = false

const CANVAS_SIZE = 700

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

ctx.fillStyle = 'white'
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE)

ctx.lineWidth = 2.5;
ctx.strokeStyle = 'black';


function stopPainting() {
    painting = false
}

function startPainting() {
    if (!filling) painting = true

}

function onMouseMove(event) {
    x = event.offsetX;
    y = event.offsetY;
    if (!painting) {
        ctx.beginPath()
        ctx.moveTo(x, y)
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    console.log('onMouseDown', event);
    painting = true
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color
    ctx.fillStyle = color
    infocolor.style.backgroundColor = color

}

function handleRangeChange(event) {
    const rangeValue = event.target.value
    ctx.lineWidth = rangeValue
    inforange.textContent = rangeValue
}

function handleModeClick() {
    if (filling) {
        filling = false
        // filling = !filling
        mode.innerText = 'Fill'
    } else {
        filling = true
        // filling = !filling
        mode.innerText = 'Draw'
    }
}

function handleCanvasClick() {
    console.log('handleCanvasClick');
    if (filling) {
        ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE)
    }
}


function handleCM(event) {
    event.preventDefault()
}

function handleSaveClick() {
    const image = canvas.toDataURL()
    const link = document.createElement('a')
    link.href = image
    link.download = 'Paint-JS [Export]'
    link.click()
}


if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup',   stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('click', handleCanvasClick)
    canvas.addEventListener('contextmenu', handleCM)
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick))

if (range) {
    range.addEventListener('input', handleRangeChange)
}

if (mode) {
    mode.addEventListener('click', handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick)
}