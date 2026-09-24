import {svg} from 'hybrids';
import {todayX} from './geometry';

export const today = {
	get: ({now, unitWidth, trimHeight}) => {
		if (!Number.isFinite(now)) {
			return null;
		}

		return svg`
			<g class="today" transform="translate(${todayX({now, unitWidth})}, 0)">
				<line y2="${trimHeight}"></line>
				<text dx="4" dy="12">today (w${now})</text>
			</g>
		`;
	}
};
