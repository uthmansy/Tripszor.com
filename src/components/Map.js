import GoogleMapReact from "google-map-react";
import { useState } from "react";
import useScreen from "../hooks/useScreen";

export default function Map({
	coords,
	setCoords,
	setBounds,
	places,
	setChildClicked,
}) {
	return (
		<div className="h-screen lg:ml-80">
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
				defaultCenter={coords}
				center={coords}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={{
					disableDefaultUI: true,
					zoomControl: true,
					// styles: mapStyles,
				}}
				onChange={(e) => {
					setCoords({ lat: e.center.lat, lng: e.center.lng });
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
				}}>
				{places?.map((place, i) => (
					<MapPlaceLg
						setChildClicked={setChildClicked}
						index={i}
						key={i}
						place={place}
						lat={Number(place.latitude)}
						lng={Number(place.longitude)}
					/>
				))}
			</GoogleMapReact>
		</div>
	);
}

const MapPlaceLg = ({ place, index, setChildClicked }) => {
	const [hover, setHover] = useState(false);
	const { isMediumScreen } = useScreen();

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

	if (!isMediumScreen)
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-7 w-7 text-red-700"
				viewBox="0 0 20 20"
				fill="currentColor">
				<path
					fillRule="evenodd"
					d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
					clipRule="evenodd"
				/>
			</svg>
		);

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() => setChildClicked(index)}
			style={{ "&:hover": { color: "red" } }}
			className={`bg-white p-2 w-24 rounded-md overflow-hidden absolute border shadow-md text-sm cursor-pointer ${
				hover ? "z-20" : "z-10"
			}`}>
			<p className="mb-1">{place.name}</p>
			<img
				className="w-full"
				src={
					place.photo ? place.photo.images.medium.url : "/images/no-image.jpg"
				}
				alt=""
			/>
			<div className="flex w-full justify-between">
				{rating.map((item) => item)}
			</div>
		</div>
	);
};
