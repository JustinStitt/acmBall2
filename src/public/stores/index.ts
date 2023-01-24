import { readable } from 'svelte/store';
import { persistable } from './persistable';

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
  Game.Body.rotate(bar, 0.03)
  if (frame % 20 == 0) {
    var new_ball = Game.Bodies.circle(Game.width / 2, 0, 10)
    Game.addObject(new_ball)
  }
}

`
);

const editor_text_key = '__editor_text';
export const editor_text = persistable(editor_text_key, '');

const game_view_key = '__game_view';
export const game_view = persistable(game_view_key, 'left');

// export const starting_text = readable(
// 	`
// console.log('Game: ', Game)
// const setup = () => {
//   console.log('setting up!')
// }

// const draw = () => {

// }

// `
// );
