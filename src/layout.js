// Hybrids property descriptors adapting the pure functions of
// src/geometry.js to the component's reactive properties.
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
	get: ({taskHeight}) => index =>
		geometry.taskVerticalPosition({taskHeight, index})
};

export const latestEnd = {
	get: ({data}) => geometry.latestEnd(data.tasks)
};

export const unitWidth = {
	get: ({trimWidth, latestEnd, zoom}) =>
		geometry.unitWidth({trimWidth, latestEnd, zoom})
};

export const taskHorizontalPosition = {
	get: ({unitWidth}) => start =>
		geometry.taskHorizontalPosition({unitWidth, start})
};

export const taskWidth = {
	get: ({unitWidth}) => duration =>
		geometry.taskWidth({unitWidth, duration})
};
