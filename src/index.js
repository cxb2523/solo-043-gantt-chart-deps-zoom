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
	height,
	tasks,
	milestones,
	dependencies,
	today,
	margin,
	unitWidth,
	latestEnd,
	globalTransform
}) {
	return html`
		${style}
		<svg width=${margin.left + (unitWidth * latestEnd) + margin.right} height=${height}>
			<defs>
				<marker
					id="gantt-arrow"
					viewBox="0 0 10 10"
					refX="9"
					refY="5"
					markerWidth="7"
					markerHeight="7"
					orient="auto-start-reverse"
				>
					<path d="M 0 0 L 10 5 L 0 10 z"></path>
				</marker>
			</defs>
			<g transform="${globalTransform}">
				<g class="tasks">${tasks}</g>
				<g class="dependencies">${dependencies}</g>
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
	now: null,
	zoom: 1,
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
