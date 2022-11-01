import Matter from 'matter-js';

export let width = 800;
export let height = 800;
export let running = false;

export const setRunning = (isRunning) => {
	running = isRunning;
};

export const Engine = Matter.Engine;
export const Render = Matter.Render;
export const Runner = Matter.Runner;
export const Bodies = Matter.Bodies;
export const Composite = Matter.Composite;
export const Body = Matter.Body;
export const World = Matter.World;

// create an engine
export const engine = Engine.create();
export const addObject = (obj) => {
	Composite.add(engine.world, [obj]);
};

// create runner
export const runner = Runner.create();

// run the engine
// Runner.run(runner, engine);
