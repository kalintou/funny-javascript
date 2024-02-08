var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "rgba(255,0,0, 0.5)";
// c.fillRect(100 , 100, 100, 100);
// c.fillStyle = "rgba(0,255,0, 0.5)";
// c.fillRect(400 , 100, 100, 100);
// c.fillStyle = "rgba(0,0,255, 0.5)";
// c.fillRect(300 , 300, 100, 100);
// console.log(canvas);

// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "red";
// c.stroke();

// var colors = ["red", "green", "blue", "yellow", "pink" ,"purple"];

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
// // Arc
// //for(let j = 0; j < 100; j++) {
//     for(let i = 0; i < 5523; i++) {
//         var x = Math.random() * window.innerWidth;
//         var y = Math.random() * window.innerHeight;
//         c.beginPath();
//         c.arc(x, y, 21, 0, Math.PI * 2, false);
//         c.strokeStyle = colors[parseInt(randomNumber(0, 5))];
//         c.stroke();
//     }
// //}

var mouse = {
    x: undefined,
    y: undefined
}

function direct() {
    if(Math.random() > 0.5) return 1;
    else return -1;
}

var colorArray = [
    '#ffaa33',
    '#99ffaa',
    '#00ff00',
    '#4411aa',
    '#ff1100'
];

window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.originalRadius = radius;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
            ) {
            if (this.radius < 40) {
                this.radius += 5;
            }
        } else if(this.radius > this.originalRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}


var circleArray = [];


function init() {

    circleArray = [];

    for(let i = 0; i < 1000; i++) {
        var x = Math.random() * innerWidth;
        var y = Math.random() * innerHeight;
        var dx = Math.random() - 0.5;
        var dy = Math.random() - 0.5;
        var radius = randomNumber(1,10);
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
}

init();


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    
}
animate();
