import { useEffect, useRef } from "react";
import { Loader, Place } from ".";
import useScreen from "../hooks/useScreen";

export default function Places({
	places,
	isLoading,
	setType,
	childClicked,
	setFilter,
}) {
	const elRef = useRef([]);

	useEffect(() => {
		if (!childClicked) return;
		elRef.current[childClicked].scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	}, [childClicked]);

	const { isLargeScreen } = useScreen();

	return (
		<div
			style={{ height: `${isLargeScreen ? "auto" : "75vh"}` }}
			className="lg:fixed lg:left-0 lg:top-14 lg:bottom-0 lg:w-80 overflow-auto lg:h-auto mb-10 lg:mb-0">
			<h2 className="text-xl my-0 pt-5 px-5 bg-white">
				Food, Attractions & Hotels around you
			</h2>
			<div className="flex space-x-2 sticky top-0 py-3 px-5 bg-white shadow-md">
				<label className="flex flex-col flex-1">
					<span className="text-sm mb-2">Type:</span>
					<select
						onChange={(e) => setType(e.target.value)}
						className="px-3 py-1 w-full border rounded-none outline-none">
						<option value="hotels">Hotels</option>
						<option value="restaurants" selected>
							Restaurants
						</option>
						<option value="attractions">Attractions</option>
					</select>
				</label>
				<label className="flex flex-col flex-1">
					<span className="text-sm mb-2">Ratings:</span>
					<select
						onChange={(e) => setFilter(Number(e.target.value))}
						className="px-3 py-1 w-full border rounded-none outline-none">
						<option selected value="0">
							All
						</option>
						<option value="3.0">3.0</option>
						<option value="4.0">4.0</option>
					</select>
				</label>
			</div>
			<div className="bg-gray-100 p-5">
				{isLoading ? (
					<Loader />
				) : (
					places?.map((place, i) => (
						<Place index={i} ref={elRef} key={i} place={place} />
					))
				)}
			</div>
		</div>
	);
}
