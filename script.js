const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");

document.querySelector("#start").addEventListener('click', transform, false);

function genGridLines() {
    for (let i = -4; i<=4; i++) {
        gridLines.push({
            p: {x: i-4, y: 0},
            v: {x: 0, y: 1}
        });
        gridLines.push({
            p: {x: 0, y: i+4},
            v: {x: 1, y: 0}
        });
    }
}

let gridLines = [];
genGridLines();

let i = 0;

let x1;
let y1; 
let x2;
let y2;

function transform() {
    inputs = document.querySelectorAll(".matrix");
    x1 = parseInt(inputs[0].value);
    y1 = parseInt(inputs[1].value);
    x2 = parseInt(inputs[2].value);
    y2 = parseInt(inputs[3].value);

    i = 0;
    console.log("y1 INPUT: " + y1);
    drawTransform(x1, y1, x2, y2);
}

// X1    Y1
// X2    Y2

let lines = [
    {x:0, y:1, color: "red"},
    {x:1, y:0, color: "green"},
    {x:1, y:1, color: "yellow"}
]

function drawTransform() {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.clientHeight, canvas.clientHeight);

    ctx.lineWidth = 1;
    for (let i = 0; i<=8; i++) {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(i*100, 0);
        ctx.lineTo(i*100, canvas.height);
        ctx.stroke();
    }

    for (let i = 0; i<=8; i++) {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(0, i*100);
        ctx.lineTo(canvas.width, i*100);
        ctx.stroke();
    }

    gridLines.forEach(gridLine => {
        for (let t = -800; t<0; t++) {                       // x=500 y=300 pont ,helye a 300-300
            let x = 400 + gridLine.p.x * 100 + gridLine.v.x*t;  // x = 500
            let y = 400 + -gridLine.p.y * 100 + gridLine.v.y*t; // y = 300
    
            let targetX = x*x1+y*y1 // targetX = 500 * -1 + 300 * 0
            let targetY = x*x2+y*y2 //x*x2+y*y2;
            let dx = targetX - x;
            let dy = targetY - y;
            if ((gridLine.p.x == -4 && gridLine.p.y == 0) || (gridLine.p.x == 0 && gridLine.p.y == 4)) {
                drawPixel(x+400 + dx/200*i, y+400 + dy/200*i, 0, 0, 0);
            } else {
                drawPixel(x+400 + dx/200*i, y+400 + dy/200*i, 255, 255, 255);
            }
            
        }
    });

    lines.forEach(line => {
        let targetX = line.x*x1+line.y*y1; 
        let targetY = line.x*x2+line.y*y2;
        let dx = targetX - line.x;
        let dy = targetY - line.y;
        drawLine(line.x + dx/200*i, line.y + dy/200*i, line.color);
    });

    if (i < 200) {
        i++;
        requestAnimationFrame(drawTransform);
    }
}

function drawLine(x, y, color="black") {
    ctx.beginPath();
    ctx.moveTo(400, 400);
    ctx.lineTo(400+x*100, 400+-y*100);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
}


function drawPixel(x, y, color1, color2, color3) {
    ctx.fillStyle = "rgb("+((1-color1) * 255)+","+((1-color2) * 255)+","+((1-color3) * 255)+")";
    ctx.fillRect(x, 800-y, 2, 2);
}

let gridline1 = {
    p: {x: 1, y: 0},
    v: {x: 0, y: 1}
}

/*

const o = {x: 400, y:400};
let prev = performance.now();

let transformTarget = {x: -1, y:1};
let yellowLine = {x: 1, y: 1};

let difference = {x: transformTarget.x-yellowLine.x, y: transformTarget.y - yellowLine.y};

function draw() {
    const now = performance.now();
    const dt = now - prev;
    prev = now;

    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.clientHeight, canvas.clientHeight);

    if (i < 300) i++;

    drawLine(yellowLine.x + difference.x/300*i, yellowLine.y + difference.y/300*i, "yellow");

    drawLine(1, 0, "green");
    drawLine(0, 1, "red");
    //drawLine(1, 1, "yellow");
    requestAnimationFrame(draw);
}

*/

