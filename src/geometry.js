export const margin = ({marginTop, marginRight, marginBottom, marginLeft}) => ({
	top: marginTop,
	right: marginRight,
	bottom: marginBottom,
	left: marginLeft
});

export const trimWidth = ({width, margin}) => width - margin.left - margin.right;

export const trimHeight = ({height, margin}) => height - margin.top - margin.bottom;

export const globalTransform = ({margin}) => `translate(${margin.left}, ${margin.top})`;

export const taskHeight = ({trimHeight, taskCount}) => trimHeight / Math.max(10, taskCount);

export const taskVerticalPosition = ({taskHeight}) => index => taskHeight * index;

export const latestEnd = ({tasks}) => tasks.length > 0 ?
	tasks
		.map(el => el.start + el.duration)
		.reduce((p, c) => c > p ? c : p, 0) :
	1;

export const unitWidth = ({trimWidth, latestEnd, zoom = 1}) => (trimWidth / latestEnd) * zoom;

export const taskHorizontalPosition = ({unitWidth}) => start => unitWidth * start;

export const taskWidth = ({unitWidth}) => duration => unitWidth * duration;

export const sortTasks = tasks => tasks
	.map(el => el)
	.sort((a, b) =>
		(a.start < b.start) ||
		((a.start === b.start) && (a.duration < b.duration)) ?
			-1 :
			1
	);

export const todayX = ({now, unitWidth}) => unitWidth * now;

export const dependencyPoints = ({from, to, unitWidth, taskHeight, offset = 10}) => {
	const x1 = (from.start + from.duration) * unitWidth;
	const y1 = (from.index * taskHeight) + (taskHeight / 2);
	const x2 = to.start * unitWidth;
	const y2 = (to.index * taskHeight) + (taskHeight / 2);
	const elbowX = x1 + offset;
	return [
		{x: x1, y: y1},
		{x: elbowX, y: y1},
		{x: elbowX, y: y2},
		{x: x2, y: y2}
	];
};
