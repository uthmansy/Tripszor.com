import { configureStore } from "@reduxjs/toolkit";
import coins from "./slices/coins";

export const store = configureStore({
	reducer: {
		coins: coins,
	},
});
