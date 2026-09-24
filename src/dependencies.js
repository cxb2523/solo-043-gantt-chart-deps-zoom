import {svg} from 'hybrids';
import {sortTasks} from './geometry';

const elbow = 10;

export const dependencies = {
	get: ({
		data,
		taskVerticalPosition,
		taskHorizontalPosition,
		taskWidth,
		taskHeight
	}) => {
		const sortedTasks = sortTasks(data.tasks);
		return (data.dependencies || []).map(dependency => {
			const fromIndex = sortedTasks.findIndex(task => task.id === dependency.from);
			const toIndex = sortedTasks.findIndex(task => task.id === dependency.to);
			if (fromIndex < 0 || toIndex < 0) {
				return svg``;
			}

			const fromTask = sortedTasks[fromIndex];
			const toTask = sortedTasks[toIndex];
			const x1 = taskHorizontalPosition(fromTask.start) + taskWidth(fromTask.duration);
			const y1 = taskVerticalPosition(fromIndex) + (taskHeight / 2);
			const x2 = taskHorizontalPosition(toTask.start);
			const y2 = taskVerticalPosition(toIndex) + (taskHeight / 2);
			const midX = x1 + Math.max(elbow, (x2 - x1) / 2);
			return svg`
				<path
					class="dependency"
					d="M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}"
					marker-end="url(#arrowhead)"
				></path>
			`;
		});
	}
};
