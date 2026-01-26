import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false
    },
    reducers : {
        setLoading : (state) => {
            state.loading = !state.loading
        }
    }
})

export const {setLoading} = authSlice.actions;
export default authSlice.reducer;