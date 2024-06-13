import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, createUser, updateUser, deleteUser } from "../thunks/userThunks";
import { fetchProvinces, fetchRegencies, fetchDistricts, fetchVillages } from '../thunks/regionThunks';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        provinces: [],
        regencies: [],
        districts: [],
        villages: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.data.findIndex(user => user.id === action.payload.id);
                state.data[index] = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter(user => user.id !== action.payload);
            })
            .addCase(fetchProvinces.fulfilled, (state, action) => {
                state.provinces = action.payload;
            })
            .addCase(fetchRegencies.fulfilled, (state, action) => {
                state.regencies = action.payload;
            })
            .addCase(fetchDistricts.fulfilled, (state, action) => {
                state.districts = action.payload;
            })
            .addCase(fetchVillages.fulfilled, (state, action) => {
                state.villages = action.payload;
            });
    },
});

export default userSlice.reducer;
