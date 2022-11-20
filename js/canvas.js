"use strict";

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

const ctx = canvas.getContext('2d');

//Arc / Circle
// ctx.beginPath();
// ctx.arc(100, 75, 50, 0, 2 * Math.PI);
// ctx.stroke();
//
// //Rectangle
// ctx.fillStyle = 'rgba(255, 0, 0, .65)'
// ctx.fillRect(100,100,100,100)
// ctx.fillStyle = 'rgba(10, 100, 50, .65)'
// ctx.fillRect(400,100,100,100)
// ctx.fillStyle = 'rgba(55, 110, 240, .65)'
// ctx.fillRect(200,500,100,100)
//
// //Line
// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(600, 400);
// ctx.strokeStyle = "#fa3421";
// ctx.stroke();
//
// //another circle
// ctx.beginPath();
// ctx.arc(300, 300, 100, 0, 2 * Math.PI);
// ctx.strokeStyle = "#a1efff";
// ctx.stroke();
//
// for(let i = 0; i < 3; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.arc(x, y, 100, 0, 2 * Math.PI);
//     ctx.strokeStyle = "#a1efff";
//     ctx.stroke();
// }

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 50;
// let minRadius = 2;

let colorArray = ['#E74C3C', '#085454', '#7A7A7A', '#FFFFFF', '#FFB30D'];

window.addEventListener("mousemove", function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function () {
        //bounce off walls on the x-axis
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        //bounce off walls on the y-axis
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx;
        this.y += this.dy;

//CONDITION 1: IF x of mouse minus x of circle is less than 50 on left and right side AND y of mouse minus x of circle is less than 50 on top and bottom
//CONDITION 2: ELSE IF radius is greater than expected minRadius, reduce current radius...This shrinks circles when mouse is not hovering.
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) { //if radius is less than maxRadius
                this.radius += 1; //increment radius plus 1 pixel
            }
        } else if (this.radius > this.minRadius) { //if radius > minRadius
            this.radius -= 1; //decrement radius minus 1 pixel
        }

        this.draw()
    }
}

let circleArr = [];
function init() {
    circleArr = [];
    for (let i = 0; i < 800; i++) {
        var radius = Math.random() * 3 + 2;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArr.push(new Circle(x, y, dx, dy, radius))
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update()
    }
}
animate();
init();