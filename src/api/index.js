import axios from "axios";

export const getPlaces = async ({ type, bounds }) => {
	if (!bounds) return null;
	const options = {
		method: "GET",
		url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
		params: {
			bl_latitude: bounds.sw.lat,
			bl_longitude: bounds.sw.lng,
			tr_longitude: bounds.ne.lng,
			tr_latitude: bounds.ne.lat,
			limit: "30",
		},
		headers: {
			"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
			"x-rapidapi-key": process.env.REACT_APP_TRIP_ADVISOR_KEY,
		},
	};
	try {
		const {
			data: { data: places },
		} = await axios.request(options);
		return places;
	} catch (error) {
		if (error.response) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error("something went wrong");
		}
	}
};

export const getSearchResults = async ({ search }) => {
	if (search.length === 0) return;
	const options = {
		method: "GET",
		url: "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete",
		params: { query: search, lang: "en_US", units: "km" },
		headers: {
			"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
			"x-rapidapi-key": process.env.REACT_APP_TRIP_ADVISOR_KEY,
		},
	};
	try {
		const results = await axios.request(options);
		return results.data.data.Typeahead_autocomplete.results;
	} catch (error) {
		if (error.response) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error("something went wrong");
		}
	}
};
