import {test} from 'node:test';
import assert from 'node:assert/strict';
import {
	trimWidth,
	trimHeight,
	taskHeight,
	taskVerticalPosition,
	latestEnd,
	unitWidth,
	taskHorizontalPosition,
	taskWidth,
	sortTasks,
	todayMarker
} from '../src/geometry.js';

test('trimWidth and trimHeight subtract margins', () => {
	const margin = {top: 10, right: 20, bottom: 30, left: 40};
	assert.equal(trimWidth({width: 800, margin}), 740);
	assert.equal(trimHeight({height: 600, margin}), 560);
});

test('taskHeight divides the trim height, with a minimum of 10 rows', () => {
	assert.equal(taskHeight({trimHeight: 100, taskCount: 5}), 10);
	assert.equal(taskHeight({trimHeight: 100, taskCount: 20}), 5);
});

test('taskVerticalPosition places rows by index', () => {
	assert.equal(taskVerticalPosition({taskHeight: 25, index: 0}), 0);
	assert.equal(taskVerticalPosition({taskHeight: 25, index: 3}), 75);
});

test('latestEnd is the latest start + duration, 1 when empty', () => {
	const tasks = [
		{start: 0, duration: 4},
		{start: 10, duration: 6},
		{start: 3, duration: 2}
	];
	assert.equal(latestEnd(tasks), 16);
	assert.equal(latestEnd([]), 1);
});

test('unitWidth scales the trim width by zoom over latestEnd', () => {
	assert.equal(unitWidth({trimWidth: 200, latestEnd: 10}), 20);
	assert.equal(unitWidth({trimWidth: 200, latestEnd: 10, zoom: 1}), 20);
	assert.equal(unitWidth({trimWidth: 200, latestEnd: 10, zoom: 2}), 40);
	assert.equal(unitWidth({trimWidth: 200, latestEnd: 10, zoom: 4}), 80);
});

test('horizontal position and bar width derive from unitWidth', () => {
	assert.equal(taskHorizontalPosition({unitWidth: 20, start: 3}), 60);
	assert.equal(taskWidth({unitWidth: 20, duration: 4}), 80);
});

test('sortTasks orders by start, then by duration', () => {
	const tasks = [
		{id: 1, start: 5, duration: 2},
		{id: 2, start: 0, duration: 4},
		{id: 3, start: 5, duration: 1},
		{id: 4, start: 0, duration: 2}
	];
	assert.deepEqual(
		sortTasks(tasks).map(task => task.id),
		[4, 2, 3, 1]
	);
	// The input array is not mutated.
	assert.deepEqual(tasks.map(task => task.id), [1, 2, 3, 4]);
});

test('todayMarker computes the marker coordinates from the now week', () => {
	assert.deepEqual(
		todayMarker({now: 5, unitWidth: 20, trimHeight: 300}),
		{x: 100, y1: 0, y2: 300}
	);
});
