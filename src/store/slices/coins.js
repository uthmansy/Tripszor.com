import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: [],
};

export const coins = createSlice({
	name: "coins",
	initialState,
	reducers: {
		storeCoins: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { storeCoins } = coins.actions;

export const selectcoins = (state) => state.coins.data;

export default coins.reducer;
