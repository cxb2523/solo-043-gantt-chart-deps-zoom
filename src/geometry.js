// Pure geometry functions for the gantt chart layout.
// They take plain objects and return plain values: no DOM, no hybrids.

export const margin = ({marginTop, marginRight, marginBottom, marginLeft}) => ({
	top: marginTop,
	right: marginRight,
	bottom: marginBottom,
	left: marginLeft
});

export const trimWidth = ({width, margin}) =>
	width - margin.left - margin.right;

export const trimHeight = ({height, margin}) =>
	height - margin.top - margin.bottom;

export const globalTransform = ({margin}) =>
	`translate(${margin.left}, ${margin.top})`;

export const taskHeight = ({trimHeight, taskCount}) =>
	trimHeight / Math.max(10, taskCount);

export const taskVerticalPosition = ({taskHeight, index}) =>
	taskHeight * index;

export const sortTasks = tasks =>
	tasks
		.map(el => el)
		.sort((a, b) =>
			(a.start < b.start) ||
			((a.start === b.start) && (a.duration < b.duration)) ?
				-1 :
				1
		);

export const latestEnd = tasks =>
	tasks.length > 0 ?
		tasks
			.map(el => el.start + el.duration)
			.reduce((p, c) => c > p ? c : p, 0) :
		1;

export const unitWidth = ({trimWidth, latestEnd, zoom = 1}) =>
	(trimWidth * zoom) / latestEnd;

export const taskHorizontalPosition = ({unitWidth, start}) =>
	unitWidth * start;

export const taskWidth = ({unitWidth, duration}) =>
	unitWidth * duration;

export const todayMarker = ({now, unitWidth, trimHeight}) => ({
	x: unitWidth * now,
	y1: 0,
	y2: trimHeight
});
