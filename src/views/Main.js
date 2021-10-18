import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Header, Map, Places } from "../components";
import { getPlaces } from "../api";

export default function Main() {
	const [coords, setCoords] = useState({ lat: 40.712776, lng: -74.005974 });
	const [bounds, setBounds] = useState(null);
	const [type, setType] = useState("restaurants");
	const [childClicked, setChildClicked] = useState(null);
	const [filter, setFilter] = useState(0);
	const [places, setPlaces] = useState([]);

	const { data, isLoading } = useQuery(["getPlaces", bounds, type], () =>
		getPlaces({ type, bounds })
	);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoords({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		setPlaces(data?.filter((place) => place.rating > filter));
	}, [filter, data]);

	return (
		<div>
			<Header setCoords={setCoords} />
			<Places
				childClicked={childClicked}
				places={places}
				isLoading={isLoading}
				setType={setType}
				setFilter={setFilter}
			/>
			<Map
				setChildClicked={setChildClicked}
				coords={coords}
				setCoords={setCoords}
				setBounds={setBounds}
				places={places}
			/>
		</div>
	);
}
