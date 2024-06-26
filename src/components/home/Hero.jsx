import { useEffect, useRef, useState } from 'react';

import downloadResume from '@/helpers/downloadResume';
import useResizer from '@/hooks/useResizer';

const mainHero = 'THENDUP TSERING';
const alphanums = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const LETTER_DANCE_INTERVAL = 25;

export default function Hero() {
	const [heroName, setHeroName] = useState(mainHero);
	const [isDancing, setIsDancing] = useState(false);
	const { windowWidth } = useResizer();

	const danceInterval = useRef(null);

	const startDancing = () => {
		if (danceInterval.current) clearInterval(danceInterval.current);
		danceInterval.current = setInterval(() => {
			const newHero = mainHero
				.split('')
				.map(() => {
					return alphanums[Math.floor(Math.random() * alphanums.length)];
				})
				.join('');

			setHeroName(newHero);
		}, LETTER_DANCE_INTERVAL);
	};

	const stopDancing = () => {
		if (danceInterval.current) clearInterval(danceInterval.current);
		let danceMoves = 0;

		danceInterval.current = setInterval(() => {
			const newHero = mainHero
				.split('')
				.map((l, i) => {
					if (i < danceMoves) return l;

					return alphanums[Math.floor(Math.random() * alphanums.length)];
				})
				.join('');

			if (danceMoves > mainHero.length) clearInterval(danceInterval.current);

			setHeroName(newHero);
			danceMoves += 1 / 5;
		}, LETTER_DANCE_INTERVAL);
	};

	const handleMouseEnter = () => {
		if (isDancing) return;

		setIsDancing(true);
		startDancing();
	};

	const handleMouseLeave = () => {
		if (!isDancing) return;

		stopDancing();
		setIsDancing(false);
	};

	useEffect(() => {
		if (windowWidth < 854) return;
		startDancing();

		setTimeout(() => {
			stopDancing();
		}, 7000);
	}, []);

	return (
		<section id="hero" className="Home__section Home__section--hero">
			<div className="Home__section-info-main">
				<p className="Home__section-line1" style={{ animationDelay: '0ms' }}>
					Hello, my name is
				</p>

				<h1
					className="Home__section-line2"
					style={{ animationDelay: '200ms' }}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{heroName}
				</h1>

				<h1 className="Home__section-line2 Home__section-line2--static">
					THENDUP
					<br />
					TSERING
				</h1>

				<p className="Home__section-line3" style={{ animationDelay: '400ms' }}>
					I am a senior front-end react developer based in Toronto, Canada
				</p>

				<div
					className="Home__section-buttons Home__section-line4"
					style={{ animationDelay: '600ms' }}
				>
					<button
						className="Home__section-button Button Button--default"
						onClick={downloadResume}
					>
						Download resume
					</button>
				</div>
			</div>
		</section>
	);
}
