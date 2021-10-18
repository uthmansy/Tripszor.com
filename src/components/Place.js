import { forwardRef } from "react";

export default forwardRef(function ({ place, index }, ref) {
	const rating = Array(5).fill(
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-5 w-5 text-gray-400"
			viewBox="0 0 20 20"
			fill="currentColor">
			<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
		</svg>
	);

	for (let i = 0; i < (Math.floor(place.rating) || 0); i++) {
		rating[i] = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5 text-yellow-400"
				viewBox="0 0 20 20"
				fill="currentColor">
				<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
			</svg>
		);
	}

	return (
		<div
			ref={(el) => (ref.current[index] = el)}
			className="shadow-lg mb-5 rounded-lg overflow-hidden bg-white text-sm">
			<img
				className="w-full"
				src={
					place.photo ? place.photo.images.medium.url : "/images/no-image.jpg"
				}
				alt=""
			/>
			<div className="p-4">
				<a
					href={place.web_url}
					target="_blank"
					className="font-semibold mb-2 text-lg  text-black block">
					{place.name}
				</a>
				<div className="flex items-center justify-between mb-2 text-sm">
					<div className="flex">{rating.map((item) => item)}</div>
					<span>{`${place.num_reviews || 0} ${
						place.num_reviews > 1 ? "reviews" : "review"
					}`}</span>
				</div>
				<div className="flex items-center justify-between mb-2">
					<span>Price: </span>
					<span>{place.price_level}</span>
				</div>
				<p className="text-sm mb-5">{place.ranking}</p>
				<div className="mb-4">
					{place?.cuisine?.map(({ name }) => (
						<span
							className="bg-gray-200 text-sm rounded-full px-3 py-1 mr-2 mb-2 inline-block"
							key={name}>
							{name}
						</span>
					))}
				</div>
				{place.address && (
					<div className="flex space-x-2 items-start mb-2 text-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7 flex-shrink-0 text-gray-500"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="flex-1">{place.address}</p>
					</div>
				)}
				{place.phone && (
					<div className="flex space-x-2 items-start mb-2 text-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7 flex-shrink-0 text-gray-500"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
						</svg>
						<p>{place.phone}</p>
					</div>
				)}
				{place.web_url && (
					<a
						className="px-2 py-1 text-sm uppercase tracking-wide bg-blue-50 border border-blue-200 inline-block mr-2"
						href={place.web_url}
						target="_blank">
						Trip Advisor
					</a>
				)}
				{place.website && (
					<a
						className="px-2 py-1 text-sm uppercase tracking-wide bg-blue-50 border border-blue-200 inline-block mr-2"
						href={place.website}
						target="_blank">
						Website
					</a>
				)}
			</div>
		</div>
	);
});
