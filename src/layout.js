import * as geometry from './geometry';

export const margin = {
	get: ({marginTop, marginRight, marginBottom, marginLeft}) =>
		geometry.margin({marginTop, marginRight, marginBottom, marginLeft})
};

export const trimWidth = {
	get: ({width, margin}) => geometry.trimWidth({width, margin})
};

export const trimHeight = {
	get: ({height, margin}) => geometry.trimHeight({height, margin})
};

export const globalTransform = {
	get: ({margin}) => geometry.globalTransform({margin})
};

export const taskHeight = {
	get: ({trimHeight, data}) =>
		geometry.taskHeight({trimHeight, taskCount: data.tasks.length})
};

export const taskVerticalPosition = {
	get: ({taskHeight}) => geometry.taskVerticalPosition({taskHeight})
};

export const latestEnd = {
	get: ({data}) => geometry.latestEnd({tasks: data.tasks})
};

export const unitWidth = {
	get: ({trimWidth, latestEnd, zoom}) =>
		geometry.unitWidth({trimWidth, latestEnd, zoom})
};

export const taskHorizontalPosition = {
	get: ({unitWidth}) => geometry.taskHorizontalPosition({unitWidth})
};

export const taskWidth = {
	get: ({unitWidth}) => geometry.taskWidth({unitWidth})
};
