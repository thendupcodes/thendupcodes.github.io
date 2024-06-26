export default function Logo({ animationClassName }) {
	return (
		<div className={`Logo fa-stack fa-2x ${animationClassName}`}>
			<i className="Logo__left fa-solid fa-angle-left fa-stack-2x" />
			<i className="Logo__right fa-solid fa-angle-right fa-stack-2x" />
		</div>
	);
}
