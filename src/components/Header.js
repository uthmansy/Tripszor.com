import { useState } from "react";
import { useQuery } from "react-query";
import { Loader } from ".";
import { getSearchResults } from "../api";

export default function Header({ setCoords }) {
	const [search, setSearch] = useState("");
	const { data: results, isLoading } = useQuery(
		["getPlaces", search],
		() => getSearchResults({ search }),
		{
			refetchOnMount: false,
		}
	);

	return (
		<header className="sticky top-0 w-full h-14 bg-primary text-white px-5 z-50 shadow-lg">
			<div className="mx-auto flex h-full items-center justify-between">
				<div className="cursor-pointer invisible sm:visible">
					<img src="/images/logo.png" className="h-8" alt="logo" />
				</div>
				<div className="flex bg-black bg-opacity-30 h-9 items-center px-2 space-x-2 relative w-60 lg:w-72">
					{search.length > 0 && (
						<button
							onClick={() => setSearch("")}
							className="outline-none absolute right-0 h-9 flex items-center justify-center w-9">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 bg-black bg-opacity-50 rounded-full p-1 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					)}

					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 opacity-70"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						placeholder="search for places..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						type="text"
						className="outline-none text-sm flex-1 bg-transparent h-full text-white placeholder-white placeholder-opacity-50"
					/>
					<div className="absolute top-9 -left-2 bg-white w-full text-gray-700 z-50 shadow-md">
						{isLoading ? (
							<Loader />
						) : (
							results?.map((result, i) => (
								<SearchResult
									key={i}
									result={result}
									setCoords={setCoords}
									setSearch={setSearch}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</header>
	);
}

const SearchResult = ({ result, setCoords, setSearch }) => {
	if (!result.detailsV2) return null;
	const handleClick = () => {
		setCoords({
			lat: result.detailsV2.geocode.latitude,
			lng: result.detailsV2.geocode.longitude,
		});
		setSearch("");
	};
	return (
		<div
			onClick={handleClick}
			className="p-3 text-gray-500 text-sm border-b flex space-x-2 items-start cursor-pointer hover:bg-gray-100">
			<div className="bg-gray-200 flex items-center justify-center rounded-full h-9 w-9 flex-shrink-0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path
						fillRule="evenodd"
						d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
			<p className="w-full mb-0">{`${result.detailsV2?.names?.name} ${result.detailsV2?.names?.longOnlyHierarchyTypeaheadV2}`}</p>
		</div>
	);
};
