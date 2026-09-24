import {svg} from 'hybrids';
import {todayMarker} from './geometry';

export const today = {
	get: ({now, unitWidth, trimHeight}) => {
		if (now === null || now === undefined) {
			return '';
		}

		const {x, y1, y2} = todayMarker({now, unitWidth, trimHeight});
		return svg`
			<g class="today">
				<line x1=${x} x2=${x} y1=${y1} y2=${y2}></line>
				<text x=${x} y=${y1} dx="5" dy="0">today</text>
			</g>
		`;
	}
};
