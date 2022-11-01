import Matter from 'matter-js';

export let width = 800;
export let height = 800;

export const Engine = Matter.Engine;
export const Render = Matter.Render;
export const Runner = Matter.Runner;
export const Bodies = Matter.Bodies;
export const Composite = Matter.Composite;

// create an engine
export const engine = Engine.create();

// create a renderer

// create two boxes and a ground
const ground = Bodies.rectangle(width / 2, height, width, 60, { isStatic: true });

export const addObject = (obj) => {
	Composite.add(engine.world, [obj]);
};

// add all of the bodies to the world
Composite.add(engine.world, [ground]);

// create runner
export const runner = Runner.create();

// run the engine
Runner.run(runner, engine);
