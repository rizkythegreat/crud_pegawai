import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    const response = await axios.get("https://61601920faa03600179fb8d2.mockapi.io/pegawai");
    return response.data;
});

export const createUser = createAsyncThunk("user/createUser", async (newUser) => {
    const response = await axios.post("https://61601920faa03600179fb8d2.mockapi.io/pegawai", newUser);
    return response.data;
});

export const updateUser = createAsyncThunk("user/updateUser", async ({ id, updatedUser }) => {
    const response = await axios.put(`https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`, updatedUser);
    return response.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
    await axios.delete(`https://61601920faa03600179fb8d2.mockapi.io/pegawai/${id}`);
    return id;
});
