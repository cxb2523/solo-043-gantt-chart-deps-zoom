import {html, define, property} from 'hybrids';
import style from './style';
import {
	margin,
	trimWidth,
	trimHeight,
	globalTransform,
	taskHeight,
	taskVerticalPosition,
	latestEnd,
	unitWidth,
	taskHorizontalPosition,
	taskWidth
} from './layout';
import {tasks} from './tasks';
import {milestones} from './milestones';
import {dependencies} from './dependencies';
import {today} from './today';

function render({
	width,
	height,
	tasks,
	milestones,
	dependencies,
	today,
	globalTransform
}) {
	return html`
		${style}
		<svg width=${width} height=${height}>
			<defs>
				<marker
					id="arrowhead"
					markerWidth="10"
					markerHeight="7"
					refX="10"
					refY="3.5"
					orient="auto"
				>
					<polygon points="0 0, 10 3.5, 0 7"></polygon>
				</marker>
			</defs>
			<g transform="${globalTransform}">
				<g class="dependencies">${dependencies}</g>
				<g class="tasks">${tasks}</g>
				<g class="milestones">${milestones}</g>
				${today}
			</g>
		</svg>
	`;
}

export const GanttChart = {
	data: property({
		tasks: []
	}),
	width: 800,
	height: 600,
	zoom: 1,
	now: null,
	marginRight: 20,
	marginBottom: 20,
	marginLeft: 20,
	marginTop: 20,
	margin,
	trimWidth,
	trimHeight,
	globalTransform,
	taskHeight,
	taskVerticalPosition,
	latestEnd,
	unitWidth,
	taskHorizontalPosition,
	taskWidth,
	tasks,
	milestones,
	dependencies,
	today,
	render
};

define('gantt-chart', GanttChart);
