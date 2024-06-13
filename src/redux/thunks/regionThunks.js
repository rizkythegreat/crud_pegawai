import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProvinces = createAsyncThunk('users/fetchProvinces', async () => {
    const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
    return response.data;
});

export const fetchRegencies = createAsyncThunk('users/fetchRegencies', async (provinceId) => {
    const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
    return response.data;
});

export const fetchDistricts = createAsyncThunk('users/fetchDistricts', async (regencyId) => {
    const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`);
    return response.data;
});

export const fetchVillages = createAsyncThunk('users/fetchVillages', async (districtId) => {
    const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`);
    return response.data;
});
