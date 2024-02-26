import { spotPriceInterface } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name: "authState",
    initialState: {
        user: null,
        isLoggedin: false,
        hasVisited: false,
        spotPrices: {} as spotPriceInterface
    },
    reducers: {
        signin: (state, action) => {
            state.user = action.payload;
            state.isLoggedin = true
        },
        signout: (state) => {
            state.user = null;
            state.isLoggedin = false
        },
        updateName: (state, action) => {
            state.user = action.payload;
            state.isLoggedin = true
        },
        isVisited: (state, action) => {
            state.hasVisited = action.payload;
        },
        updateSpotPrices: (state, action) => {
            state.spotPrices = action.payload
        }
    }
})

export const { signin, signout, updateName, isVisited, updateSpotPrices } = userSlice.actions
export const selectUser = (state: any) => state.user;
export default userSlice.reducer;