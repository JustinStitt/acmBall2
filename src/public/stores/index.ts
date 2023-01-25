import { readable, writable, get } from 'svelte/store';

// subscribe to this store for realtime editor text information
export const editor_text = writable('');

// default game view (game view on left, editor on right)
export const game_view = writable('left');

// default ball radius
export const BALL_RADIUS = readable(50);

// Prepended to User Code
export const BOILER_PLATE = readable(
	`import { engines } from "./src/public/engines/index.ts";
const Game = engines[0];
Game.meta.draw = draw;
Game.meta.setup = setup;
`
);

// Default code User sees in their Web Editor
export const starting_text = readable(
	`${get(BOILER_PLATE)}
var ball = Game.Bodies.circle(200, 200, ${get(BALL_RADIUS)})
ball.render.strokeStyle = 'white'
ball.render.lineWidth = 3

var ground = Game.Bodies.rectangle(Game.width / 2, Game.height, Game.width, 60)
Game.Body.setStatic(ground, true)
ground.restitution = 0.9
ground.render.fillStyle = 'green'


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
