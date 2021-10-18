export default function Loader() {
	return (
		<div className="flex items-center justify-center h-36">
			<svg
				className="w-10 h-10 animate-spin text-blue-primary"
				viewBox="0 0 64 64">
				<circle
					cx="32"
					cy="32"
					r="27.9"
					stroke="currentColor"
					fill="none"
					strokeWidth="6"
					className="opacity-30"
				/>
				<path
					fill="none"
					strokeWidth="6"
					stroke="currentColor"
					d="M7.3,18.9C12.1,9.8,21.7,4.1,32,4.1c15.3,0,27.9,12.6,27.9,27.9"
					className="z-30"
				/>
			</svg>
		</div>
	);
}
