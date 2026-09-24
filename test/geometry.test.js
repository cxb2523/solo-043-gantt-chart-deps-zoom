import {test} from 'node:test';
import assert from 'node:assert/strict';
import {
	margin,
	trimWidth,
	trimHeight,
	taskHeight,
	taskVerticalPosition,
	latestEnd,
	unitWidth,
	taskHorizontalPosition,
	taskWidth,
	sortTasks,
	todayX,
	dependencyPoints
} from '../src/geometry.js';

const margins = margin({marginTop: 20, marginRight: 20, marginBottom: 20, marginLeft: 20});

test('trimWidth and trimHeight subtract margins', () => {
	assert.equal(trimWidth({width: 800, margin: margins}), 760);
	assert.equal(trimHeight({height: 600, margin: margins}), 560);
});

test('taskHeight divides the trimmed height by the task count', () => {
	assert.equal(taskHeight({trimHeight: 560, taskCount: 14}), 40);
});

test('taskHeight never uses less than 10 rows', () => {
	assert.equal(taskHeight({trimHeight: 560, taskCount: 4}), 56);
	assert.equal(taskHeight({trimHeight: 560, taskCount: 0}), 56);
});

test('taskVerticalPosition places rows on the task height grid', () => {
	const position = taskVerticalPosition({taskHeight: 40});
	assert.equal(position(0), 0);
	assert.equal(position(3), 120);
});

test('latestEnd is the latest start plus duration', () => {
	const tasks = [
		{start: 0, duration: 4},
		{start: 10, duration: 6},
		{start: 5, duration: 3}
	];
	assert.equal(latestEnd({tasks}), 16);
});

test('latestEnd of an empty task list is 1', () => {
	assert.equal(latestEnd({tasks: []}), 1);
});

test('unitWidth maps one week on the trimmed width', () => {
	assert.equal(unitWidth({trimWidth: 760, latestEnd: 20}), 38);
});

test('unitWidth scales with zoom without touching the data', () => {
	assert.equal(unitWidth({trimWidth: 760, latestEnd: 20, zoom: 1}), 38);
	assert.equal(unitWidth({trimWidth: 760, latestEnd: 20, zoom: 2}), 76);
	assert.equal(unitWidth({trimWidth: 760, latestEnd: 20, zoom: 4}), 152);
});

test('horizontal position and task width derive from unitWidth', () => {
	const uw = unitWidth({trimWidth: 760, latestEnd: 20, zoom: 2});
	assert.equal(taskHorizontalPosition({unitWidth: uw})(5), 380);
	assert.equal(taskWidth({unitWidth: uw})(3), 228);
});

test('sortTasks orders by start, then by duration', () => {
	const tasks = [
		{id: 1, start: 4, duration: 2},
		{id: 2, start: 0, duration: 5},
		{id: 3, start: 0, duration: 2},
		{id: 4, start: 8, duration: 1}
	];
	assert.deepEqual(sortTasks(tasks).map(task => task.id), [3, 2, 1, 4]);
});

test('sortTasks does not mutate the input array', () => {
	const tasks = [
		{id: 1, start: 4, duration: 2},
		{id: 2, start: 0, duration: 5}
	];
	sortTasks(tasks);
	assert.deepEqual(tasks.map(task => task.id), [1, 2]);
});

test('todayX places the today marker on the week grid', () => {
	const uw = unitWidth({trimWidth: 760, latestEnd: 20});
	assert.equal(todayX({now: 7, unitWidth: uw}), 266);
	assert.equal(todayX({now: 7, unitWidth: unitWidth({trimWidth: 760, latestEnd: 20, zoom: 4})}), 1064);
});

test('dependencyPoints route an elbow polyline between two rows', () => {
	const points = dependencyPoints({
		from: {start: 0, duration: 4, index: 0},
		to: {start: 6, duration: 2, index: 2},
		unitWidth: 10,
		taskHeight: 40,
		offset: 10
	});
	assert.deepEqual(points, [
		{x: 40, y: 20},
		{x: 50, y: 20},
		{x: 50, y: 100},
		{x: 60, y: 100}
	]);
});
