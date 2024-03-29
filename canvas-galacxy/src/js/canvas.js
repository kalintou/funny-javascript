// canvas.js
import * as utils from './utils.js';

// 使用 utils 命名空间访问函数
const value = utils.randomIntFromRange(10, 100);
const color = utils.randomColor(['red', 'green', 'blue']);


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#7BA830', '#B565A8', '#196AC7', '#D12422', '#F64413']

let mouseDown = false
addEventListener('mousedown', () => {
  mouseDown = true
})

addEventListener('mouseup', () => {
  mouseDown = false
})

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //c.shadowColor = this.color
    //c.shadowBlur = 15
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 800; i++) {
    // objects.push()
    const canvasWidth = canvas.width + 300
    const canvasHeight = canvas.height + 300
    const x = Math.random() * canvasWidth - canvasWidth / 2
    const y = Math.random() * canvasHeight - canvasHeight / 2
    const radius = 2 * Math.random()

    const color = colors[Math.floor(Math.random() * colors.length)]
    particles.push(new Particle(x,y,radius,color))
  }
}

// Animation Loop
let radians = 0
let alpha = 1
function animate() {
  requestAnimationFrame(animate)
  //c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = `rgba(10,10,10,${alpha})`
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()
  c.translate(canvas.width / 2, canvas.height / 2)
  c.rotate(radians)

  

  particles.forEach(particle => {
    particle.update()
  })
  c.restore()
  radians += 0.001

  if(mouseDown && alpha >= 0.05) {
    alpha -= 0.05
  } else if(!mouseDown && alpha < 1) {
    alpha += 0.002
  }
  
}

init()
animate()
