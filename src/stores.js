import { readable, writable } from 'svelte/store';

export const starting_text = readable(
	// "var boxB = Game.Bodies.rectangle(200, 200, 300, 300)\nfunction setup() { // runs once at start\n  console.log('hi')\n  Game.addObject(boxB)\n}\n\nfunction draw() { // runs every frame\n  console.log('drawing')\n}"
	// 	`var ground = Game.Bodies.rectangle(Game.width / 2, Game.height, Game.width, 60, {isStatic: true, render: {
	//     fillStyle: 'red', strokeStyle: 'blue', lineWidth: 3
	//   }
	// })
	`var ground = Game.Bodies.rectangle(Game.width / 2, Game.height, Game.width, 60)
Game.Body.setStatic(ground, true)
ground.restitution = 0.9
ground.render.fillStyle = 'green'

var ball = Game.Bodies.circle(200, 200, 50)
ball.render.strokeStyle = 'white'
ball.render.lineWidth = 3

var bar = Game.Bodies.rectangle(Game.width / 2, Game.height / 2, 300, 50)
Game.Body.setStatic(bar, true)

function setup() {
  Game.addObject(ground)
  Game.addObject(ball)
  Game.addObject(bar)
}

let frame = 0
function draw() {
  ++frame
  Game.Body.rotate(bar, 0.1)
  if (frame % 40 == 0) {
    var new_ball = Game.Bodies.circle(Game.width / 2, 0, 10)
    Game.addObject(new_ball)
  }
}

`
);
export const editor_text = writable('');
