import {svg} from 'hybrids';
import {sortTasks, dependencyPoints} from './geometry';

export const dependencies = {
	get: ({data, unitWidth, taskHeight}) => {
		const sortedTasks = sortTasks(data.tasks);
		return (data.dependencies || [])
			.map(dependency => {
				const fromIndex = sortedTasks.findIndex(task => task.id === dependency.from);
				const toIndex = sortedTasks.findIndex(task => task.id === dependency.to);
				if (fromIndex < 0 || toIndex < 0) {
					return null;
				}

				const points = dependencyPoints({
					from: {...sortedTasks[fromIndex], index: fromIndex},
					to: {...sortedTasks[toIndex], index: toIndex},
					unitWidth,
					taskHeight
				});
				return svg`
					<polyline
						class="dependency"
						points="${points.map(point => `${point.x},${point.y}`).join(' ')}"
						marker-end="url(#gantt-arrow)"
					></polyline>
				`;
			})
			.filter(Boolean);
	}
};
